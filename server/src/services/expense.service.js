import expenseRepository from '../repositories/expense.repository.js';
import AppError from '../utils/AppError.js';

class ExpenseService {
    async createExpense(data) {
        const insertId = await expenseRepository.create(data);
        return await expenseRepository.findById(insertId);
    }

    async getExpenseById(id) {
        const log = await expenseRepository.findById(id);
        if (!log) {
            throw new AppError('Expense not found', 404);
        }
        return log;
    }

    async getAllExpenses(filters) {
        return await expenseRepository.findAll(filters);
    }

    async updateExpense(id, data) {
        await this.getExpenseById(id);
        await expenseRepository.update(id, data);
        return await expenseRepository.findById(id);
    }

    async deleteExpense(id) {
        await this.getExpenseById(id);
        await expenseRepository.delete(id);
    }
}

export default new ExpenseService();
