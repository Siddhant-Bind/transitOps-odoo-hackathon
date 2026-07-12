import { body } from 'express-validator';
import { handleValidationErrors } from './auth.validator.js';

export const validateCreateFuel = [
    body('vehicle_id').isInt().withMessage('Valid vehicle ID is required'),
    body('fuel_date').isISO8601().withMessage('Valid fuel date is required'),
    body('fuel_liters').isFloat({ gt: 0 }).withMessage('Fuel liters must be greater than 0'),
    body('fuel_cost').isFloat({ min: 0 }).withMessage('Fuel cost must be a non-negative number'),
    body('odometer_reading').isFloat({ min: 0 }).withMessage('Valid odometer reading is required'),
    handleValidationErrors
];
