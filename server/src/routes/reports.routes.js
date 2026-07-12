import express from 'express';
import reportsController from '../controllers/reports.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo } from '../middleware/rbac.middleware.js';

const router = express.Router();

// Reports are highly sensitive, restricted to Financial Analyst and Admin
router.use(protect);
router.use(restrictTo('Financial Analyst', 'Fleet Manager', 'Admin'));

router.get('/fleet-utilization', reportsController.getFleetUtilization);
router.get('/fuel-efficiency', reportsController.getFuelEfficiency);
router.get('/operational-cost', reportsController.getOperationalCost);
router.get('/roi', reportsController.getROI);
router.get('/export', reportsController.exportCSV);

export default router;
