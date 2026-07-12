import { body } from 'express-validator';
import { handleValidationErrors } from './auth.validator.js';

export const validateCreateMaintenance = [
    body('vehicle_id').isInt().withMessage('Valid vehicle ID is required'),
    body('maintenance_type').notEmpty().withMessage('Maintenance type is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('scheduled_date').isISO8601().withMessage('Valid scheduled date is required'),
    handleValidationErrors
];

export const validateUpdateMaintenance = [
    body('maintenance_type').notEmpty().withMessage('Maintenance type is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('scheduled_date').isISO8601().withMessage('Valid scheduled date is required'),
    handleValidationErrors
];

export const validateCloseMaintenance = [
    body('actual_date').isISO8601().withMessage('Valid actual date is required'),
    body('cost').isFloat({ min: 0 }).withMessage('Valid cost is required'),
    handleValidationErrors
];
