import maintenanceService from '../services/maintenance.service.js';
import { catchAsync } from '../middleware/errorHandler.js';

class MaintenanceController {
    createMaintenance = catchAsync(async (req, res) => {
        const data = {
            ...req.body,
            created_by: req.user.id
        };
        const log = await maintenanceService.createMaintenance(data);
        res.status(201).json({ success: true, message: 'Maintenance scheduled', data: log });
    });

    getAllMaintenance = catchAsync(async (req, res) => {
        const filters = {
            vehicle_id: req.query.vehicle_id,
            status: req.query.status
        };
        const logs = await maintenanceService.getAllMaintenance(filters);
        res.status(200).json({ success: true, results: logs.length, data: logs });
    });

    getMaintenanceById = catchAsync(async (req, res) => {
        const log = await maintenanceService.getMaintenanceById(req.params.id);
        res.status(200).json({ success: true, data: log });
    });

    updateMaintenance = catchAsync(async (req, res) => {
        const log = await maintenanceService.updateMaintenance(req.params.id, req.body);
        res.status(200).json({ success: true, message: 'Maintenance updated', data: log });
    });

    closeMaintenance = catchAsync(async (req, res) => {
        const { actual_date, cost } = req.body;
        const log = await maintenanceService.closeMaintenance(req.params.id, actual_date, cost);
        res.status(200).json({ success: true, message: 'Maintenance closed', data: log });
    });
}

export default new MaintenanceController();
