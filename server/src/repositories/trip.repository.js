import pool from '../config/db.js';

class TripRepository {
    async create(tripData) {
        const { trip_reference, source_location, destination_location, cargo_weight, planned_distance, vehicle_id, driver_id, created_by } = tripData;
        const query = `
            INSERT INTO trips 
            (trip_reference, source_location, destination_location, cargo_weight, planned_distance, vehicle_id, driver_id, created_by, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Draft')
        `;
        const [result] = await pool.query(query, [
            trip_reference, source_location, destination_location, cargo_weight, planned_distance, vehicle_id, driver_id, created_by
        ]);
        return result.insertId;
    }

    async findById(tripId) {
        const query = `
            SELECT t.*, v.registration_number, d.full_name as driver_name 
            FROM trips t
            LEFT JOIN vehicles v ON t.vehicle_id = v.vehicle_id
            LEFT JOIN drivers d ON t.driver_id = d.driver_id
            WHERE t.trip_id = ?
        `;
        const [rows] = await pool.query(query, [tripId]);
        return rows[0];
    }

    async findAll(filters) {
        let query = `
            SELECT t.*, v.registration_number, d.full_name as driver_name 
            FROM trips t
            LEFT JOIN vehicles v ON t.vehicle_id = v.vehicle_id
            LEFT JOIN drivers d ON t.driver_id = d.driver_id
            WHERE 1=1
        `;
        const values = [];

        if (filters.status) {
            query += ` AND t.status = ?`;
            values.push(filters.status);
        }
        if (filters.driver_id) {
            query += ` AND t.driver_id = ?`;
            values.push(filters.driver_id);
        }
        if (filters.vehicle_id) {
            query += ` AND t.vehicle_id = ?`;
            values.push(filters.vehicle_id);
        }

        query += ` ORDER BY t.created_at DESC`;

        const [rows] = await pool.query(query, values);
        return rows;
    }

    async dispatchTrip(tripId, userId) {
        await pool.query('CALL dispatch_trip(?, ?)', [tripId, userId]);
    }

    async completeTrip(tripId, endOdometer, fuelConsumed, actualDistance, userId) {
        await pool.query('CALL complete_trip(?, ?, ?, ?, ?)', [tripId, endOdometer, fuelConsumed, actualDistance, userId]);
    }

    async cancelTrip(tripId, userId) {
        await pool.query('CALL cancel_trip(?, ?)', [tripId, userId]);
    }
}

export default new TripRepository();
