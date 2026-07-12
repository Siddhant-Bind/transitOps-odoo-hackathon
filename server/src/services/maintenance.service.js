import maintenanceRepository from '../repositories/maintenance.repository.js';
import AppError from '../utils/AppError.js';

class MaintenanceService {
    async createMaintenance(data) {
        const insertId = await maintenanceRepository.create(data);
        return await maintenanceRepository.findById(insertId);
    }

    async getMaintenanceById(id) {
        const log = await maintenanceRepository.findById(id);
        if (!log) {
            throw new AppError('Maintenance log not found', 404);
        }
        return log;
    }

    async getAllMaintenance(filters) {
        return await maintenanceRepository.findAll(filters);
    }

    async updateMaintenance(id, data) {
        const log = await this.getMaintenanceById(id);
        if (log.status === 'Completed') {
            throw new AppError('Cannot update a completed maintenance log', 400);
        }
        await maintenanceRepository.update(id, data);
        return await maintenanceRepository.findById(id);
    }

    async closeMaintenance(id, actual_date, cost) {
        const log = await this.getMaintenanceById(id);
        if (log.status === 'Completed') {
            throw new AppError('Maintenance log is already closed', 400);
        }
        await maintenanceRepository.close(id, actual_date, cost);
        return await maintenanceRepository.findById(id);
    }
}

export default new MaintenanceService();
