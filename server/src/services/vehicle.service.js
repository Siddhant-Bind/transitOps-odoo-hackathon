import vehicleRepository from '../repositories/vehicle.repository.js';
import AppError from '../utils/AppError.js';

class VehicleService {
    async getAllVehicles() {
        return await vehicleRepository.findAll();
    }

    async getVehicleById(id) {
        const vehicle = await vehicleRepository.findById(id);
        if (!vehicle) {
            throw new AppError('Vehicle not found', 404);
        }
        return vehicle;
    }

    async createVehicle(data) {
        const existingVehicle = await vehicleRepository.findByRegistration(data.registration_number);
        if (existingVehicle) {
            throw new AppError('Vehicle with this registration number already exists', 400);
        }
        
        const vehicleId = await vehicleRepository.create(data);
        return await vehicleRepository.findById(vehicleId);
    }

    async updateVehicle(id, data) {
        const vehicle = await vehicleRepository.findById(id);
        if (!vehicle) {
            throw new AppError('Vehicle not found', 404);
        }

        // Business Rule: Retired vehicle cannot automatically become Available.
        if (vehicle.status === 'Retired' && data.status === 'Available') {
            throw new AppError('A retired vehicle cannot be marked as available', 400);
        }

        await vehicleRepository.update(id, data);
        return await vehicleRepository.findById(id);
    }

    async deleteVehicle(id) {
        const vehicle = await vehicleRepository.findById(id);
        if (!vehicle) {
            throw new AppError('Vehicle not found', 404);
        }

        // Ideally check if vehicle is tied to trips, but DB cascade/foreign keys will throw an error naturally
        // which will be caught by the global error handler.
        await vehicleRepository.delete(id);
    }
}

export default new VehicleService();
