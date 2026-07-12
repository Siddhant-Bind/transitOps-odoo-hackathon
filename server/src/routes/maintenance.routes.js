import express from 'express';
import maintenanceController from '../controllers/maintenance.controller.js';
import { validateCreateMaintenance, validateUpdateMaintenance, validateCloseMaintenance } from '../validators/maintenance.validator.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo } from '../middleware/rbac.middleware.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('Fleet Manager', 'Admin'));

router.post('/', validateCreateMaintenance, maintenanceController.createMaintenance);
router.get('/', maintenanceController.getAllMaintenance);
router.get('/:id', maintenanceController.getMaintenanceById);
router.put('/:id', validateUpdateMaintenance, maintenanceController.updateMaintenance);
router.put('/:id/close', validateCloseMaintenance, maintenanceController.closeMaintenance);

export default router;
