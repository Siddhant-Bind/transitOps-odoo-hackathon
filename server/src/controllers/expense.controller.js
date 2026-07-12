import expenseService from '../services/expense.service.js';
import { catchAsync } from '../middleware/errorHandler.js';

class ExpenseController {
    createExpense = catchAsync(async (req, res) => {
        const data = {
            ...req.body,
            created_by: req.user.id
        };
        const log = await expenseService.createExpense(data);
        res.status(201).json({ success: true, message: 'Expense logged', data: log });
    });

    getAllExpenses = catchAsync(async (req, res) => {
        const filters = {
            vehicle_id: req.query.vehicle_id,
            trip_id: req.query.trip_id,
            expense_type: req.query.expense_type
        };
        const logs = await expenseService.getAllExpenses(filters);
        res.status(200).json({ success: true, results: logs.length, data: logs });
    });

    getExpenseById = catchAsync(async (req, res) => {
        const log = await expenseService.getExpenseById(req.params.id);
        res.status(200).json({ success: true, data: log });
    });

    updateExpense = catchAsync(async (req, res) => {
        const log = await expenseService.updateExpense(req.params.id, req.body);
        res.status(200).json({ success: true, message: 'Expense updated', data: log });
    });

    deleteExpense = catchAsync(async (req, res) => {
        await expenseService.deleteExpense(req.params.id);
        res.status(200).json({ success: true, message: 'Expense deleted', data: null });
    });
}

export default new ExpenseController();
