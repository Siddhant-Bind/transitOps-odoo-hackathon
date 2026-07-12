import fuelService from '../services/fuel.service.js';
import { catchAsync } from '../middleware/errorHandler.js';

class FuelController {
    createFuelLog = catchAsync(async (req, res) => {
        const data = {
            ...req.body,
            created_by: req.user.id
        };
        const log = await fuelService.createFuelLog(data);
        res.status(201).json({ success: true, message: 'Fuel log created', data: log });
    });

    getAllFuelLogs = catchAsync(async (req, res) => {
        const filters = {
            vehicle_id: req.query.vehicle_id,
            trip_id: req.query.trip_id
        };
        const logs = await fuelService.getAllFuelLogs(filters);
        res.status(200).json({ success: true, results: logs.length, data: logs });
    });

    getFuelLogById = catchAsync(async (req, res) => {
        const log = await fuelService.getFuelLogById(req.params.id);
        res.status(200).json({ success: true, data: log });
    });

    deleteFuelLog = catchAsync(async (req, res) => {
        await fuelService.deleteFuelLog(req.params.id);
        res.status(200).json({ success: true, message: 'Fuel log deleted', data: null });
    });
}

export default new FuelController();
