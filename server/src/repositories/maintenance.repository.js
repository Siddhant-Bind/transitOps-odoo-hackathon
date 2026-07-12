import pool from '../config/db.js';

class MaintenanceRepository {
    async create(maintenanceData) {
        const { vehicle_id, maintenance_type, description, scheduled_date, created_by } = maintenanceData;
        const query = `
            INSERT INTO maintenance_logs 
            (vehicle_id, maintenance_type, description, scheduled_date, status, is_active, created_by) 
            VALUES (?, ?, ?, ?, 'Scheduled', TRUE, ?)
        `;
        const [result] = await pool.query(query, [vehicle_id, maintenance_type, description, scheduled_date, created_by]);
        return result.insertId;
    }

    async findById(id) {
        const query = `
            SELECT m.*, v.registration_number 
            FROM maintenance_logs m
            LEFT JOIN vehicles v ON m.vehicle_id = v.vehicle_id
            WHERE m.maintenance_id = ?
        `;
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    }

    async findAll(filters) {
        let query = `
            SELECT m.*, v.registration_number 
            FROM maintenance_logs m
            LEFT JOIN vehicles v ON m.vehicle_id = v.vehicle_id
            WHERE 1=1
        `;
        const values = [];

        if (filters.vehicle_id) {
            query += ` AND m.vehicle_id = ?`;
            values.push(filters.vehicle_id);
        }
        if (filters.status) {
            query += ` AND m.status = ?`;
            values.push(filters.status);
        }

        query += ` ORDER BY m.scheduled_date DESC`;

        const [rows] = await pool.query(query, values);
        return rows;
    }

    async update(id, updateData) {
        const { maintenance_type, description, scheduled_date } = updateData;
        const query = `
            UPDATE maintenance_logs 
            SET maintenance_type = ?, description = ?, scheduled_date = ? 
            WHERE maintenance_id = ?
        `;
        await pool.query(query, [maintenance_type, description, scheduled_date, id]);
    }

    async close(id, actual_date, cost) {
        const query = `
            UPDATE maintenance_logs 
            SET status = 'Completed', is_active = FALSE, actual_date = ?, cost = ? 
            WHERE maintenance_id = ?
        `;
        await pool.query(query, [actual_date, cost, id]);
    }
}

export default new MaintenanceRepository();
