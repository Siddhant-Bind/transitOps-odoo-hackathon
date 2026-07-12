import express from 'express';
import driverController from '../controllers/driver.controller.js';
import { validateCreateDriver, validateUpdateDriver } from '../validators/driver.validator.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo as rbac } from '../middleware/rbac.middleware.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.get('/', driverController.getAllDrivers);
router.get('/:id', driverController.getDriverById);

// Fleet Managers, Safety Officers can modify drivers
router.post('/', rbac('Fleet Manager', 'Safety Officer'), validateCreateDriver, driverController.createDriver);
router.put('/:id', rbac('Fleet Manager', 'Safety Officer'), validateUpdateDriver, driverController.updateDriver);
router.delete('/:id', rbac('Fleet Manager'), driverController.deleteDriver);

export default router;
