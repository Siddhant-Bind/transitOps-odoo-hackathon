import tripRepository from '../repositories/trip.repository.js';
import AppError from '../utils/AppError.js';

class TripService {
    async createTrip(tripData) {
        // Here we could add logic to generate a unique trip_reference if not provided
        if (!tripData.trip_reference) {
            tripData.trip_reference = `TRIP-${Date.now()}`;
        }
        const insertId = await tripRepository.create(tripData);
        return await tripRepository.findById(insertId);
    }

    async getTripById(tripId) {
        const trip = await tripRepository.findById(tripId);
        if (!trip) {
            throw new AppError('Trip not found', 404);
        }
        return trip;
    }

    async getAllTrips(filters) {
        return await tripRepository.findAll(filters);
    }

    async dispatchTrip(tripId, userId) {
        const trip = await this.getTripById(tripId);
        if (trip.status !== 'Draft') {
            throw new AppError('Only draft trips can be dispatched', 400);
        }
        try {
            await tripRepository.dispatchTrip(tripId, userId);
            return await tripRepository.findById(tripId);
        } catch (error) {
            // Check if error comes from SQL SIGNAL
            if (error.sqlState === '45000') {
                throw new AppError(error.message, 400);
            }
            throw error;
        }
    }

    async completeTrip(tripId, completionData, userId) {
        const { end_odometer, fuel_consumed, actual_distance } = completionData;
        const trip = await this.getTripById(tripId);
        
        if (trip.status !== 'Dispatched') {
            throw new AppError('Only dispatched trips can be completed', 400);
        }
        
        try {
            await tripRepository.completeTrip(tripId, end_odometer, fuel_consumed, actual_distance, userId);
            return await tripRepository.findById(tripId);
        } catch (error) {
            if (error.sqlState === '45000') {
                throw new AppError(error.message, 400);
            }
            throw error;
        }
    }

    async cancelTrip(tripId, userId) {
        const trip = await this.getTripById(tripId);
        if (trip.status === 'Completed' || trip.status === 'Cancelled') {
            throw new AppError('Cannot cancel a completed or already cancelled trip', 400);
        }
        try {
            await tripRepository.cancelTrip(tripId, userId);
            return await tripRepository.findById(tripId);
        } catch (error) {
            if (error.sqlState === '45000') {
                throw new AppError(error.message, 400);
            }
            throw error;
        }
    }
}

export default new TripService();
