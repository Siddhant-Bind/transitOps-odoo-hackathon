import tripService from '../services/trip.service.js';
import { catchAsync } from '../middleware/errorHandler.js';

class TripController {
    createTrip = catchAsync(async (req, res) => {
        const tripData = {
            ...req.body,
            created_by: req.user.id
        };
        const trip = await tripService.createTrip(tripData);
        res.status(201).json({
            success: true,
            data: trip
        });
    });

    getAllTrips = catchAsync(async (req, res) => {
        const filters = {
            status: req.query.status,
            driver_id: req.query.driver_id,
            vehicle_id: req.query.vehicle_id
        };
        const trips = await tripService.getAllTrips(filters);
        res.status(200).json({
            success: true,
            results: trips.length,
            data: trips
        });
    });

    getTripById = catchAsync(async (req, res) => {
        const trip = await tripService.getTripById(req.params.id);
        res.status(200).json({
            success: true,
            data: trip
        });
    });

    dispatchTrip = catchAsync(async (req, res) => {
        const trip = await tripService.dispatchTrip(req.params.id, req.user.id);
        res.status(200).json({
            success: true,
            message: 'Trip dispatched successfully',
            data: trip
        });
    });

    completeTrip = catchAsync(async (req, res) => {
        const trip = await tripService.completeTrip(req.params.id, req.body, req.user.id);
        res.status(200).json({
            success: true,
            message: 'Trip completed successfully',
            data: trip
        });
    });

    cancelTrip = catchAsync(async (req, res) => {
        const trip = await tripService.cancelTrip(req.params.id, req.user.id);
        res.status(200).json({
            success: true,
            message: 'Trip cancelled successfully',
            data: trip
        });
    });
}

export default new TripController();
