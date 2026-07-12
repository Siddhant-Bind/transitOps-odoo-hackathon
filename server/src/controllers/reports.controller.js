import pool from '../config/db.js';
import { catchAsync } from '../middleware/errorHandler.js';
import { createObjectCsvStringifier } from 'csv-writer';

class ReportsController {
    getFleetUtilization = catchAsync(async (req, res) => {
        const query = `
            SELECT 
                v.registration_number,
                v.vehicle_type,
                COUNT(t.trip_id) as total_trips,
                SUM(t.actual_distance) as total_distance_covered,
                v.status as current_status
            FROM vehicles v
            LEFT JOIN trips t ON v.vehicle_id = t.vehicle_id AND t.status = 'Completed'
            GROUP BY v.vehicle_id
            ORDER BY total_trips DESC
        `;
        const [rows] = await pool.query(query);
        res.status(200).json({ success: true, data: rows });
    });

    getFuelEfficiency = catchAsync(async (req, res) => {
        const query = `
            SELECT 
                v.registration_number,
                SUM(f.fuel_liters) as total_fuel_liters,
                SUM(t.actual_distance) as total_distance,
                (SUM(t.actual_distance) / NULLIF(SUM(f.fuel_liters), 0)) as km_per_liter
            FROM vehicles v
            LEFT JOIN fuel_logs f ON v.vehicle_id = f.vehicle_id
            LEFT JOIN trips t ON v.vehicle_id = t.vehicle_id AND t.status = 'Completed'
            GROUP BY v.vehicle_id
            HAVING total_distance > 0
            ORDER BY km_per_liter DESC
        `;
        const [rows] = await pool.query(query);
        res.status(200).json({ success: true, data: rows });
    });

    getOperationalCost = catchAsync(async (req, res) => {
        const query = `
            SELECT * FROM v_operational_costs
        `;
        const [rows] = await pool.query(query);
        res.status(200).json({ success: true, data: rows });
    });

    getROI = catchAsync(async (req, res) => {
        const query = `
            SELECT 
                v.registration_number,
                v.acquisition_cost as total_investment,
                COALESCE(e.total_expenses, 0) as total_maintenance_and_fuel_cost,
                (v.acquisition_cost + COALESCE(e.total_expenses, 0)) as total_cost_of_ownership
            FROM vehicles v
            LEFT JOIN (
                SELECT vehicle_id, SUM(amount) as total_expenses 
                FROM expenses 
                GROUP BY vehicle_id
            ) e ON v.vehicle_id = e.vehicle_id
        `;
        const [rows] = await pool.query(query);
        res.status(200).json({ success: true, data: rows });
    });

    exportCSV = catchAsync(async (req, res) => {
        const { report } = req.query; // 'fleet', 'fuel', 'costs', 'roi'
        let query = '';
        let headers = [];
        
        switch (report) {
            case 'fleet':
                query = `SELECT v.registration_number, v.vehicle_type, COUNT(t.trip_id) as total_trips, SUM(t.actual_distance) as total_distance_covered, v.status as current_status FROM vehicles v LEFT JOIN trips t ON v.vehicle_id = t.vehicle_id AND t.status = 'Completed' GROUP BY v.vehicle_id ORDER BY total_trips DESC`;
                headers = [
                    {id: 'registration_number', title: 'Registration Number'},
                    {id: 'vehicle_type', title: 'Vehicle Type'},
                    {id: 'total_trips', title: 'Total Trips'},
                    {id: 'total_distance_covered', title: 'Total Distance Covered (km)'},
                    {id: 'current_status', title: 'Current Status'}
                ];
                break;
            case 'fuel':
                query = `SELECT v.registration_number, SUM(f.fuel_liters) as total_fuel_liters, SUM(t.actual_distance) as total_distance, (SUM(t.actual_distance) / NULLIF(SUM(f.fuel_liters), 0)) as km_per_liter FROM vehicles v LEFT JOIN fuel_logs f ON v.vehicle_id = f.vehicle_id LEFT JOIN trips t ON v.vehicle_id = t.vehicle_id AND t.status = 'Completed' GROUP BY v.vehicle_id HAVING total_distance > 0 ORDER BY km_per_liter DESC`;
                headers = [
                    {id: 'registration_number', title: 'Registration Number'},
                    {id: 'total_fuel_liters', title: 'Total Fuel (L)'},
                    {id: 'total_distance', title: 'Total Distance (km)'},
                    {id: 'km_per_liter', title: 'Km per Liter'}
                ];
                break;
            case 'costs':
                query = `SELECT * FROM v_operational_costs`;
                headers = [
                    {id: 'vehicle_id', title: 'Vehicle ID'},
                    {id: 'registration_number', title: 'Registration Number'},
                    {id: 'fuel_cost', title: 'Fuel Cost'},
                    {id: 'maintenance_cost', title: 'Maintenance Cost'},
                    {id: 'other_expenses', title: 'Other Expenses'},
                    {id: 'total_operating_cost', title: 'Total Operating Cost'}
                ];
                break;
            case 'roi':
                query = `SELECT v.registration_number, v.acquisition_cost as total_investment, COALESCE(e.total_expenses, 0) as total_maintenance_and_fuel_cost, (v.acquisition_cost + COALESCE(e.total_expenses, 0)) as total_cost_of_ownership FROM vehicles v LEFT JOIN (SELECT vehicle_id, SUM(amount) as total_expenses FROM expenses GROUP BY vehicle_id) e ON v.vehicle_id = e.vehicle_id`;
                headers = [
                    {id: 'registration_number', title: 'Registration Number'},
                    {id: 'total_investment', title: 'Total Investment'},
                    {id: 'total_maintenance_and_fuel_cost', title: 'Total Running Cost'},
                    {id: 'total_cost_of_ownership', title: 'Total Cost of Ownership'}
                ];
                break;
            default:
                return res.status(400).json({ success: false, message: "Invalid report type. Use 'fleet', 'fuel', 'costs', or 'roi'" });
        }

        const [rows] = await pool.query(query);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No data available for export" });
        }

        const csvStringifier = createObjectCsvStringifier({
            header: headers
        });

        const csvHeader = csvStringifier.getHeaderString();
        const csvRecords = csvStringifier.stringifyRecords(rows);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="${report}_report_${new Date().toISOString().split('T')[0]}.csv"`);
        res.status(200).send(csvHeader + csvRecords);
    });
}

export default new ReportsController();
