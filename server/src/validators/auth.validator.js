import { body } from 'express-validator';
import { validationResult } from 'express-validator';
import AppError from '../utils/AppError.js';

export const validateLogin = [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError('Validation Error', 400)); 
            // The global error handler checks if err.array exists, so we could just pass errors directly
            // but since we want the unified response, we can attach the array to the AppError
            // Actually, wait, the errorHandler checks err.array.
            // Let's create a custom way or just let express-async-errors catch it? No, let's just use a normal response or pass it to next.
        }
        next();
    }
];

// Let's refine the validation middleware to return the standard format directly or pass it cleanly
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));
        
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: extractedErrors
        });
    }
    next();
};

export const loginValidator = [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
];
