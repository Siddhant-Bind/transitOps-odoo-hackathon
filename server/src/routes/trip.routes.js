import express from 'express';
import tripController from '../controllers/trip.controller.js';
import { validateCreateTrip, validateCompleteTrip } from '../validators/trip.validator.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo } from '../middleware/rbac.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/', restrictTo('Fleet Manager', 'Driver', 'Admin'), validateCreateTrip, tripController.createTrip);
router.get('/', tripController.getAllTrips);
router.get('/:id', tripController.getTripById);

router.patch('/:id/dispatch', restrictTo('Fleet Manager', 'Admin'), tripController.dispatchTrip);
router.patch('/:id/complete', restrictTo('Fleet Manager', 'Driver', 'Admin'), validateCompleteTrip, tripController.completeTrip);
router.patch('/:id/cancel', restrictTo('Fleet Manager', 'Admin'), tripController.cancelTrip);

export default router;
