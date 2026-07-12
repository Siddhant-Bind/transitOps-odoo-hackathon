import fuelRepository from '../repositories/fuel.repository.js';
import AppError from '../utils/AppError.js';

class FuelService {
    async createFuelLog(data) {
        const insertId = await fuelRepository.create(data);
        return await fuelRepository.findById(insertId);
    }

    async getFuelLogById(id) {
        const log = await fuelRepository.findById(id);
        if (!log) {
            throw new AppError('Fuel log not found', 404);
        }
        return log;
    }

    async getAllFuelLogs(filters) {
        return await fuelRepository.findAll(filters);
    }

    async deleteFuelLog(id) {
        await this.getFuelLogById(id);
        await fuelRepository.delete(id);
    }
}

export default new FuelService();
