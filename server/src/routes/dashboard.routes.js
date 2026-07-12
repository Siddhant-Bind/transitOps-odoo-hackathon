import express from 'express';
import dashboardController from '../controllers/dashboard.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo } from '../middleware/rbac.middleware.js';

const router = express.Router();

// Only Fleet Managers and Financial Analysts should view dashboard stats
router.use(protect);
router.use(restrictTo('Fleet Manager', 'Financial Analyst', 'Admin'));

router.get('/kpis', dashboardController.getKPIs);
router.get('/costs', dashboardController.getCosts);
router.get('/vehicle-summary', dashboardController.getVehicleStatusSummary);
router.get('/trip-performance', dashboardController.getTripPerformance);

export default router;
