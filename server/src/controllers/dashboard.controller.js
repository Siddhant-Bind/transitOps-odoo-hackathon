import pool from '../config/db.js';
import { catchAsync } from '../middleware/errorHandler.js';

class DashboardController {
    getKPIs = catchAsync(async (req, res) => {
        const [rows] = await pool.query('SELECT * FROM v_dashboard_kpis');
        res.status(200).json({
            success: true,
            data: rows[0] || {}
        });
    });

    getCosts = catchAsync(async (req, res) => {
        const [rows] = await pool.query('SELECT * FROM v_operational_costs');
        res.status(200).json({
            success: true,
            data: rows
        });
    });

    getVehicleStatusSummary = catchAsync(async (req, res) => {
        const [rows] = await pool.query('SELECT * FROM v_vehicle_status_summary');
        res.status(200).json({
            success: true,
            data: rows
        });
    });

    getTripPerformance = catchAsync(async (req, res) => {
        const [rows] = await pool.query('SELECT * FROM v_trip_performance');
        res.status(200).json({
            success: true,
            data: rows
        });
    });
}

export default new DashboardController();
