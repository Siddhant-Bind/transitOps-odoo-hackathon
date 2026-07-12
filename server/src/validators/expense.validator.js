import { body } from 'express-validator';
import { handleValidationErrors } from './auth.validator.js';

export const validateCreateExpense = [
    body('vehicle_id').isInt().withMessage('Valid vehicle ID is required'),
    body('expense_type').isIn(['Fuel', 'Maintenance', 'Toll', 'Other']).withMessage('Invalid expense type'),
    body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required'),
    body('expense_date').isISO8601().withMessage('Valid expense date is required'),
    handleValidationErrors
];

export const validateUpdateExpense = [
    body('expense_type').isIn(['Fuel', 'Maintenance', 'Toll', 'Other']).withMessage('Invalid expense type'),
    body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required'),
    body('expense_date').isISO8601().withMessage('Valid expense date is required'),
    handleValidationErrors
];
