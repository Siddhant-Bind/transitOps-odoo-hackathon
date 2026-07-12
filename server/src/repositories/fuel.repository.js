import pool from '../config/db.js';

class FuelRepository {
    async create(fuelData) {
        const { vehicle_id, trip_id, fuel_date, fuel_liters, fuel_cost, odometer_reading, created_by } = fuelData;
        const query = `
            INSERT INTO fuel_logs 
            (vehicle_id, trip_id, fuel_date, fuel_liters, fuel_cost, odometer_reading, created_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(query, [vehicle_id, trip_id || null, fuel_date, fuel_liters, fuel_cost, odometer_reading, created_by]);
        return result.insertId;
    }

    async findById(id) {
        const query = `
            SELECT f.*, v.registration_number 
            FROM fuel_logs f
            LEFT JOIN vehicles v ON f.vehicle_id = v.vehicle_id
            WHERE f.fuel_log_id = ?
        `;
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    }

    async findAll(filters) {
        let query = `
            SELECT f.*, v.registration_number 
            FROM fuel_logs f
            LEFT JOIN vehicles v ON f.vehicle_id = v.vehicle_id
            WHERE 1=1
        `;
        const values = [];

        if (filters.vehicle_id) {
            query += ` AND f.vehicle_id = ?`;
            values.push(filters.vehicle_id);
        }
        if (filters.trip_id) {
            query += ` AND f.trip_id = ?`;
            values.push(filters.trip_id);
        }

        query += ` ORDER BY f.fuel_date DESC`;

        const [rows] = await pool.query(query, values);
        return rows;
    }

    async delete(id) {
        await pool.query('DELETE FROM fuel_logs WHERE fuel_log_id = ?', [id]);
    }
}

export default new FuelRepository();
