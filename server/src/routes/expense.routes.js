import express from 'express';
import expenseController from '../controllers/expense.controller.js';
import { validateCreateExpense, validateUpdateExpense } from '../validators/expense.validator.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo } from '../middleware/rbac.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/', restrictTo('Fleet Manager', 'Driver', 'Admin'), validateCreateExpense, expenseController.createExpense);
router.get('/', restrictTo('Fleet Manager', 'Financial Analyst', 'Admin'), expenseController.getAllExpenses);
router.get('/:id', restrictTo('Fleet Manager', 'Financial Analyst', 'Admin'), expenseController.getExpenseById);
router.put('/:id', restrictTo('Fleet Manager', 'Admin'), validateUpdateExpense, expenseController.updateExpense);
router.delete('/:id', restrictTo('Fleet Manager', 'Admin'), expenseController.deleteExpense);

export default router;
