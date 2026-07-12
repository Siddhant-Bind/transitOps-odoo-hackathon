import vehicleService from '../services/vehicle.service.js';

class VehicleController {
    async getAllVehicles(req, res, next) {
        try {
            const vehicles = await vehicleService.getAllVehicles();
            res.status(200).json({ success: true, message: 'Vehicles retrieved successfully', data: vehicles });
        } catch (error) { next(error); }
    }

    async getVehicleById(req, res, next) {
        try {
            const vehicle = await vehicleService.getVehicleById(req.params.id);
            res.status(200).json({ success: true, message: 'Vehicle retrieved successfully', data: vehicle });
        } catch (error) { next(error); }
    }

    async createVehicle(req, res, next) {
        try {
            const vehicle = await vehicleService.createVehicle(req.body);
            res.status(201).json({ success: true, message: 'Vehicle created successfully', data: vehicle });
        } catch (error) { next(error); }
    }

    async updateVehicle(req, res, next) {
        try {
            const vehicle = await vehicleService.updateVehicle(req.params.id, req.body);
            res.status(200).json({ success: true, message: 'Vehicle updated successfully', data: vehicle });
        } catch (error) { next(error); }
    }

    async deleteVehicle(req, res, next) {
        try {
            await vehicleService.deleteVehicle(req.params.id);
            res.status(200).json({ success: true, message: 'Vehicle deleted successfully', data: null });
        } catch (error) { next(error); }
    }
}

export default new VehicleController();
