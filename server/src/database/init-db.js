import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

async function initDB() {
    console.log('Connecting to MySQL...');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        multipleStatements: true
    });

    try {
        console.log('Reading schema.sql...');
        const schemaPath = path.join(process.cwd(), 'src', 'database', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing schema.sql...');
        await connection.query(schema);
        console.log('Database and schema created successfully.');

        console.log('Seeding default users and records...');
        await connection.query('USE transitops');

        const passwordHash = await bcrypt.hash('password123', 10);
        
        // Insert users ONE BY ONE to ensure it doesn't fail silently
        const users = [
            ['manager@transitops.com', passwordHash, 'John Manager', 1],
            ['driver1@transitops.com', passwordHash, 'Alex Driver', 2],
            ['safety@transitops.com', passwordHash, 'Sarah Safety', 3],
            ['finance@transitops.com', passwordHash, 'Frank Finance', 4]
        ];

        for (const user of users) {
            await connection.query(
                'INSERT INTO users (email, password_hash, full_name, role_id) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE role_id=VALUES(role_id)',
                user
            );
        }
        
        // Insert sample trip and logs now that users exist
        await connection.query(`
            INSERT IGNORE INTO trips (trip_reference, source_location, destination_location, cargo_weight, planned_distance, vehicle_id, driver_id, created_by, status) VALUES
            ('TRIP-2024-001', 'Warehouse A', 'Distribution Center B', 450.00, 120.00, 1, 1, 1, 'Draft');
        `);

        await connection.query(`
            INSERT IGNORE INTO maintenance_logs (vehicle_id, maintenance_type, description, scheduled_date, status, is_active, created_by) VALUES
            (4, 'Oil Change', 'Regular oil change and filter replacement', '2026-07-15', 'Scheduled', TRUE, 1);
        `);

        await connection.query(`
            INSERT IGNORE INTO fuel_logs (vehicle_id, fuel_date, fuel_liters, fuel_cost, odometer_reading, created_by) VALUES
            (1, '2026-07-10', 45.00, 67.50, 12600.00, 1);
        `);

        await connection.query(`
            INSERT IGNORE INTO expenses (vehicle_id, expense_type, description, amount, expense_date, created_by) VALUES
            (1, 'Toll', 'Highway toll for trip', 15.00, '2026-07-11', 1);
        `);

        console.log('Creating stored procedures and triggers...');
        const procedures = [
            `CREATE PROCEDURE dispatch_trip(IN p_trip_id INT, IN p_user_id INT)
             BEGIN
                 DECLARE v_vehicle_id INT;
                 DECLARE v_driver_id INT;
                 DECLARE v_cargo_weight DECIMAL(8,2);
                 DECLARE v_max_load DECIMAL(8,2);
                 DECLARE v_vehicle_status VARCHAR(20);
                 DECLARE v_driver_status VARCHAR(20);
                 DECLARE v_license_expiry DATE;
                 DECLARE v_trip_status VARCHAR(20);
                 START TRANSACTION;
                 SELECT vehicle_id, driver_id, cargo_weight, status INTO v_vehicle_id, v_driver_id, v_cargo_weight, v_trip_status FROM trips WHERE trip_id = p_trip_id;
                 IF v_trip_status != 'Draft' THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only draft trips can be dispatched'; END IF;
                 SELECT status, max_load_capacity INTO v_vehicle_status, v_max_load FROM vehicles WHERE vehicle_id = v_vehicle_id;
                 IF v_vehicle_status != 'Available' THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Vehicle is not available'; END IF;
                 IF v_cargo_weight > v_max_load THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cargo weight exceeds vehicle capacity'; END IF;
                 SELECT status, license_expiry_date INTO v_driver_status, v_license_expiry FROM drivers WHERE driver_id = v_driver_id;
                 IF v_driver_status != 'Available' THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Driver is not available'; END IF;
                 IF v_license_expiry < CURDATE() THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Driver license has expired'; END IF;
                 UPDATE trips SET status = 'Dispatched', dispatch_time = NOW() WHERE trip_id = p_trip_id;
                 UPDATE vehicles SET status = 'On Trip' WHERE vehicle_id = v_vehicle_id;
                 UPDATE drivers SET status = 'On Trip' WHERE driver_id = v_driver_id;
                 COMMIT;
             END;`,
            `CREATE PROCEDURE complete_trip(IN p_trip_id INT, IN p_end_odometer DECIMAL(10,2), IN p_fuel_consumed DECIMAL(8,2), IN p_actual_distance DECIMAL(8,2), IN p_user_id INT)
             BEGIN
                 DECLARE v_vehicle_id INT;
                 DECLARE v_driver_id INT;
                 DECLARE v_trip_status VARCHAR(20);
                 START TRANSACTION;
                 SELECT vehicle_id, driver_id, status INTO v_vehicle_id, v_driver_id, v_trip_status FROM trips WHERE trip_id = p_trip_id;
                 IF v_trip_status != 'Dispatched' THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only dispatched trips can be completed'; END IF;
                 UPDATE trips SET status = 'Completed', completion_time = NOW(), end_odometer = p_end_odometer, fuel_consumed = p_fuel_consumed, actual_distance = p_actual_distance WHERE trip_id = p_trip_id;
                 UPDATE vehicles SET status = 'Available', odometer = p_end_odometer WHERE vehicle_id = v_vehicle_id;
                 UPDATE drivers SET status = 'Available' WHERE driver_id = v_driver_id;
                 COMMIT;
             END;`,
            `CREATE PROCEDURE cancel_trip(IN p_trip_id INT, IN p_user_id INT)
             BEGIN
                 DECLARE v_vehicle_id INT;
                 DECLARE v_driver_id INT;
                 DECLARE v_trip_status VARCHAR(20);
                 START TRANSACTION;
                 SELECT vehicle_id, driver_id, status INTO v_vehicle_id, v_driver_id, v_trip_status FROM trips WHERE trip_id = p_trip_id;
                 UPDATE trips SET status = 'Cancelled' WHERE trip_id = p_trip_id;
                 IF v_trip_status = 'Dispatched' THEN
                     UPDATE vehicles SET status = 'Available' WHERE vehicle_id = v_vehicle_id AND status = 'On Trip';
                     UPDATE drivers SET status = 'Available' WHERE driver_id = v_driver_id AND status = 'On Trip';
                 END IF;
                 COMMIT;
             END;`,
            `CREATE TRIGGER trg_maintenance_vehicle_status AFTER INSERT ON maintenance_logs FOR EACH ROW
             BEGIN
                 IF NEW.is_active = TRUE THEN
                     UPDATE vehicles SET status = 'In Shop' WHERE vehicle_id = NEW.vehicle_id AND status IN ('Available', 'On Trip');
                 END IF;
             END;`,
            `CREATE TRIGGER trg_maintenance_completed AFTER UPDATE ON maintenance_logs FOR EACH ROW
             BEGIN
                 IF NEW.status = 'Completed' AND NEW.is_active = FALSE THEN
                     IF NOT EXISTS (SELECT 1 FROM maintenance_logs WHERE vehicle_id = NEW.vehicle_id AND is_active = TRUE) THEN
                         UPDATE vehicles SET status = 'Available' WHERE vehicle_id = NEW.vehicle_id AND status = 'In Shop';
                     END IF;
                 END IF;
             END;`
        ];

        for (const proc of procedures) {
            await connection.query(proc);
        }

        console.log('Database seeded successfully! (Password for all users: password123)');

    } catch (error) {
        console.error('Error initializing database:', error.message);
        process.exitCode = 1;
    } finally {
        await connection.end();
        process.exit();
    }
}

initDB();
