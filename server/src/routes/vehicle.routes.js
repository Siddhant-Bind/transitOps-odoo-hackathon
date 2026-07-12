import express from 'express';
import vehicleController from '../controllers/vehicle.controller.js';
import { validateCreateVehicle, validateUpdateVehicle } from '../validators/vehicle.validator.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo as rbac } from '../middleware/rbac.middleware.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);

// Only Fleet Managers can modify vehicles
router.post('/', rbac('Fleet Manager'), validateCreateVehicle, vehicleController.createVehicle);
router.put('/:id', rbac('Fleet Manager'), validateUpdateVehicle, vehicleController.updateVehicle);
router.delete('/:id', rbac('Fleet Manager'), vehicleController.deleteVehicle);

export default router;
