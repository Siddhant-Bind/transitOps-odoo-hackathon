import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
    try {
        console.log('Starting database seeding...');
        
        const passwordHash = await bcrypt.hash('password123', 10);
        
        const users = [
            ['manager@transitops.com', passwordHash, 'John Manager', 1],
            ['driver1@transitops.com', passwordHash, 'Alex Driver', 2],
            ['safety@transitops.com', passwordHash, 'Sarah Safety', 3]
        ];
        
        const query = `
            INSERT INTO users (email, password_hash, full_name, role_id) 
            VALUES ? 
            ON DUPLICATE KEY UPDATE role_id=VALUES(role_id)
        `;
        
        await pool.query(query, [users]);

        // Insert sample trip and logs now that users exist
        await pool.query(`
            INSERT IGNORE INTO trips (trip_reference, source_location, destination_location, cargo_weight, planned_distance, vehicle_id, driver_id, created_by, status) VALUES
            ('TRIP-2024-001', 'Warehouse A', 'Distribution Center B', 450.00, 120.00, 1, 1, 1, 'Draft');
        `);

        await pool.query(`
            INSERT IGNORE INTO maintenance_logs (vehicle_id, maintenance_type, description, scheduled_date, status, is_active, created_by) VALUES
            (4, 'Oil Change', 'Regular oil change and filter replacement', '2026-07-15', 'Scheduled', TRUE, 1);
        `);

        await pool.query(`
            INSERT IGNORE INTO fuel_logs (vehicle_id, fuel_date, fuel_liters, fuel_cost, odometer_reading, created_by) VALUES
            (1, '2026-07-10', 45.00, 67.50, 12600.00, 1);
        `);

        await pool.query(`
            INSERT IGNORE INTO expenses (vehicle_id, expense_type, description, amount, expense_date, created_by) VALUES
            (1, 'Toll', 'Highway toll for trip', 15.00, '2026-07-11', 1);
        `);

        console.log('Database seeded successfully with default users and records. (Password: password123)');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
