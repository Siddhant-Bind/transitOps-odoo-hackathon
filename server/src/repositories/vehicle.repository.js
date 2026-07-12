import pool from '../config/db.js';

class VehicleRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM vehicles ORDER BY created_at DESC');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM vehicles WHERE vehicle_id = ?', [id]);
        return rows[0];
    }

    async findByRegistration(registration_number) {
        const [rows] = await pool.query('SELECT * FROM vehicles WHERE registration_number = ?', [registration_number]);
        return rows[0];
    }

    async create(vehicleData) {
        const { registration_number, vehicle_name, model, vehicle_type, max_load_capacity, odometer, acquisition_cost, status, region } = vehicleData;
        const [result] = await pool.query(
            `INSERT INTO vehicles (registration_number, vehicle_name, model, vehicle_type, max_load_capacity, odometer, acquisition_cost, status, region) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [registration_number, vehicle_name, model, vehicle_type, max_load_capacity, odometer, acquisition_cost, status || 'Available', region]
        );
        return result.insertId;
    }

    async update(id, vehicleData) {
        const { vehicle_name, model, vehicle_type, max_load_capacity, odometer, acquisition_cost, status, region } = vehicleData;
        const [result] = await pool.query(
            `UPDATE vehicles 
             SET vehicle_name = ?, model = ?, vehicle_type = ?, max_load_capacity = ?, odometer = ?, acquisition_cost = ?, status = ?, region = ?
             WHERE vehicle_id = ?`,
            [vehicle_name, model, vehicle_type, max_load_capacity, odometer, acquisition_cost, status, region, id]
        );
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM vehicles WHERE vehicle_id = ?', [id]);
        return result.affectedRows > 0;
    }
}

export default new VehicleRepository();
