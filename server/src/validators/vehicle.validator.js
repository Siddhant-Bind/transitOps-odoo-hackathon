import { body } from 'express-validator';
import { handleValidationErrors } from './auth.validator.js';

export const validateCreateVehicle = [
    body('registration_number').notEmpty().withMessage('Registration number is required'),
    body('vehicle_name').notEmpty().withMessage('Vehicle name is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('vehicle_type').notEmpty().withMessage('Vehicle type is required'),
    body('max_load_capacity').isFloat({ gt: 0 }).withMessage('Max load capacity must be greater than 0'),
    body('odometer').optional().isFloat({ min: 0 }).withMessage('Odometer must be non-negative'),
    body('acquisition_cost').isFloat({ min: 0 }).withMessage('Acquisition cost must be non-negative'),
    body('status').optional().isIn(['Available', 'On Trip', 'In Shop', 'Retired']).withMessage('Invalid status'),
    body('region').optional().isString(),
    handleValidationErrors
];

export const validateUpdateVehicle = [
    body('vehicle_name').notEmpty().withMessage('Vehicle name is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('vehicle_type').notEmpty().withMessage('Vehicle type is required'),
    body('max_load_capacity').isFloat({ gt: 0 }).withMessage('Max load capacity must be greater than 0'),
    body('odometer').isFloat({ min: 0 }).withMessage('Odometer must be non-negative'),
    body('acquisition_cost').isFloat({ min: 0 }).withMessage('Acquisition cost must be non-negative'),
    body('status').isIn(['Available', 'On Trip', 'In Shop', 'Retired']).withMessage('Invalid status'),
    body('region').optional().isString(),
    handleValidationErrors
];
