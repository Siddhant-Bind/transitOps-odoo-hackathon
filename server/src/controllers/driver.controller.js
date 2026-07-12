import driverService from '../services/driver.service.js';

class DriverController {
    async getAllDrivers(req, res, next) {
        try {
            const drivers = await driverService.getAllDrivers();
            res.status(200).json({ success: true, message: 'Drivers retrieved successfully', data: drivers });
        } catch (error) { next(error); }
    }

    async getDriverById(req, res, next) {
        try {
            const driver = await driverService.getDriverById(req.params.id);
            res.status(200).json({ success: true, message: 'Driver retrieved successfully', data: driver });
        } catch (error) { next(error); }
    }

    async createDriver(req, res, next) {
        try {
            const driver = await driverService.createDriver(req.body);
            res.status(201).json({ success: true, message: 'Driver created successfully', data: driver });
        } catch (error) { next(error); }
    }

    async updateDriver(req, res, next) {
        try {
            const driver = await driverService.updateDriver(req.params.id, req.body);
            res.status(200).json({ success: true, message: 'Driver updated successfully', data: driver });
        } catch (error) { next(error); }
    }

    async deleteDriver(req, res, next) {
        try {
            await driverService.deleteDriver(req.params.id);
            res.status(200).json({ success: true, message: 'Driver deleted successfully', data: null });
        } catch (error) { next(error); }
    }
}

export default new DriverController();
