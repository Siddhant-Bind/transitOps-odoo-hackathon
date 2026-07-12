import pool from '../config/db.js';

class ExpenseRepository {
    async create(expenseData) {
        const { vehicle_id, trip_id, expense_type, amount, description, expense_date, created_by } = expenseData;
        const query = `
            INSERT INTO expenses 
            (vehicle_id, trip_id, expense_type, amount, description, expense_date, created_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(query, [vehicle_id, trip_id || null, expense_type, amount, description, expense_date, created_by]);
        return result.insertId;
    }

    async findById(id) {
        const query = `
            SELECT e.*, v.registration_number 
            FROM expenses e
            LEFT JOIN vehicles v ON e.vehicle_id = v.vehicle_id
            WHERE e.expense_id = ?
        `;
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    }

    async findAll(filters) {
        let query = `
            SELECT e.*, v.registration_number 
            FROM expenses e
            LEFT JOIN vehicles v ON e.vehicle_id = v.vehicle_id
            WHERE 1=1
        `;
        const values = [];

        if (filters.vehicle_id) {
            query += ` AND e.vehicle_id = ?`;
            values.push(filters.vehicle_id);
        }
        if (filters.trip_id) {
            query += ` AND e.trip_id = ?`;
            values.push(filters.trip_id);
        }
        if (filters.expense_type) {
            query += ` AND e.expense_type = ?`;
            values.push(filters.expense_type);
        }

        query += ` ORDER BY e.expense_date DESC`;

        const [rows] = await pool.query(query, values);
        return rows;
    }

    async update(id, updateData) {
        const { expense_type, amount, description, expense_date } = updateData;
        const query = `
            UPDATE expenses 
            SET expense_type = ?, amount = ?, description = ?, expense_date = ? 
            WHERE expense_id = ?
        `;
        await pool.query(query, [expense_type, amount, description, expense_date, id]);
    }

    async delete(id) {
        await pool.query('DELETE FROM expenses WHERE expense_id = ?', [id]);
    }
}

export default new ExpenseRepository();
