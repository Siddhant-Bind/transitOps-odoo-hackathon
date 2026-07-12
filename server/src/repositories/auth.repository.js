import pool from '../config/db.js';

class AuthRepository {
    async getUserByEmail(email) {
        const query = `
            SELECT u.*, r.role_name 
            FROM users u 
            JOIN roles r ON u.role_id = r.role_id 
            WHERE u.email = ?
        `;
        const [rows] = await pool.query(query, [email]);
        return rows[0];
    }
}

export default new AuthRepository();
