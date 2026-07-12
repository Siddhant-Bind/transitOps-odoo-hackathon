import pool from '../config/db.js';

class DriverRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM drivers ORDER BY created_at DESC');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM drivers WHERE driver_id = ?', [id]);
        return rows[0];
    }

    async findByLicense(license_number) {
        const [rows] = await pool.query('SELECT * FROM drivers WHERE license_number = ?', [license_number]);
        return rows[0];
    }

    async create(driverData) {
        const { full_name, license_number, license_category, license_expiry_date, contact_number, safety_score, status, hire_date } = driverData;
        const [result] = await pool.query(
            `INSERT INTO drivers (full_name, license_number, license_category, license_expiry_date, contact_number, safety_score, status, hire_date) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [full_name, license_number, license_category, license_expiry_date, contact_number, safety_score || 100.00, status || 'Available', hire_date]
        );
        return result.insertId;
    }

    async update(id, driverData) {
        const { full_name, license_category, license_expiry_date, contact_number, safety_score, status, hire_date } = driverData;
        const [result] = await pool.query(
            `UPDATE drivers 
             SET full_name = ?, license_category = ?, license_expiry_date = ?, contact_number = ?, safety_score = ?, status = ?, hire_date = ?
             WHERE driver_id = ?`,
            [full_name, license_category, license_expiry_date, contact_number, safety_score, status, hire_date, id]
        );
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM drivers WHERE driver_id = ?', [id]);
        return result.affectedRows > 0;
    }
}

export default new DriverRepository();
