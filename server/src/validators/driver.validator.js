import { body } from 'express-validator';
import { handleValidationErrors } from './auth.validator.js';

export const validateCreateDriver = [
    body('full_name').notEmpty().withMessage('Full name is required'),
    body('license_number').notEmpty().withMessage('License number is required'),
    body('license_category').notEmpty().withMessage('License category is required'),
    body('license_expiry_date').isISO8601().toDate().withMessage('Invalid expiry date format'),
    body('contact_number').notEmpty().withMessage('Contact number is required'),
    body('safety_score').optional().isFloat({ min: 0, max: 100 }).withMessage('Safety score must be between 0 and 100'),
    body('status').optional().isIn(['Available', 'On Trip', 'Off Duty', 'Suspended']).withMessage('Invalid status'),
    body('hire_date').isISO8601().toDate().withMessage('Invalid hire date format'),
    handleValidationErrors
];

export const validateUpdateDriver = [
    body('full_name').notEmpty().withMessage('Full name is required'),
    body('license_category').notEmpty().withMessage('License category is required'),
    body('license_expiry_date').isISO8601().toDate().withMessage('Invalid expiry date format'),
    body('contact_number').notEmpty().withMessage('Contact number is required'),
    body('safety_score').isFloat({ min: 0, max: 100 }).withMessage('Safety score must be between 0 and 100'),
    body('status').isIn(['Available', 'On Trip', 'Off Duty', 'Suspended']).withMessage('Invalid status'),
    body('hire_date').isISO8601().toDate().withMessage('Invalid hire date format'),
    handleValidationErrors
];
