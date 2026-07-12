import express from 'express';
import fuelController from '../controllers/fuel.controller.js';
import { validateCreateFuel } from '../validators/fuel.validator.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo } from '../middleware/rbac.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/', restrictTo('Fleet Manager', 'Driver', 'Admin'), validateCreateFuel, fuelController.createFuelLog);
router.get('/', restrictTo('Fleet Manager', 'Financial Analyst', 'Admin'), fuelController.getAllFuelLogs);
router.get('/:id', restrictTo('Fleet Manager', 'Financial Analyst', 'Admin'), fuelController.getFuelLogById);
router.delete('/:id', restrictTo('Fleet Manager', 'Admin'), fuelController.deleteFuelLog);

export default router;
