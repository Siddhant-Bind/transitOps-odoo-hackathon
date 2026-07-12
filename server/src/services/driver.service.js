import driverRepository from '../repositories/driver.repository.js';
import AppError from '../utils/AppError.js';

class DriverService {
    async getAllDrivers() {
        return await driverRepository.findAll();
    }

    async getDriverById(id) {
        const driver = await driverRepository.findById(id);
        if (!driver) {
            throw new AppError('Driver not found', 404);
        }
        return driver;
    }

    async createDriver(data) {
        const existingDriver = await driverRepository.findByLicense(data.license_number);
        if (existingDriver) {
            throw new AppError('Driver with this license number already exists', 400);
        }
        
        const driverId = await driverRepository.create(data);
        return await driverRepository.findById(driverId);
    }

    async updateDriver(id, data) {
        const driver = await driverRepository.findById(id);
        if (!driver) {
            throw new AppError('Driver not found', 404);
        }

        await driverRepository.update(id, data);
        return await driverRepository.findById(id);
    }

    async deleteDriver(id) {
        const driver = await driverRepository.findById(id);
        if (!driver) {
            throw new AppError('Driver not found', 404);
        }

        await driverRepository.delete(id);
    }
}

export default new DriverService();
