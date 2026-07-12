import { body } from 'express-validator';
import { handleValidationErrors } from './auth.validator.js';

export const validateCreateTrip = [
    body('source_location').notEmpty().withMessage('Source location is required'),
    body('destination_location').notEmpty().withMessage('Destination location is required'),
    body('cargo_weight').isFloat({ gt: 0 }).withMessage('Cargo weight must be greater than 0'),
    body('planned_distance').isFloat({ gt: 0 }).withMessage('Planned distance must be greater than 0'),
    body('vehicle_id').isInt().withMessage('Valid vehicle ID is required'),
    body('driver_id').isInt().withMessage('Valid driver ID is required'),
    handleValidationErrors
];

export const validateCompleteTrip = [
    body('end_odometer').isFloat({ min: 0 }).withMessage('Valid end odometer is required'),
    body('fuel_consumed').isFloat({ min: 0 }).withMessage('Valid fuel consumed is required'),
    body('actual_distance').isFloat({ gt: 0 }).withMessage('Valid actual distance is required'),
    handleValidationErrors
];
