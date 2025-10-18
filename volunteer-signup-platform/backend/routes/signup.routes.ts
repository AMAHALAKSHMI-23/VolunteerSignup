import express from 'express';
import {
  registerForEvent,
  cancelRegistration,
  getMySignups,
  getVolunteersByEvent
} from '../controllers/signup.controller';
import { protect, adminOnly } from '../middlewares/auth.middleware';

const router = express.Router();

// Volunteer: Register for event
router.post('/', protect, registerForEvent);

// Volunteer: Cancel registration
router.delete('/:eventId', protect, cancelRegistration);

// Volunteer: Get my registered events
router.get('/me', protect, getMySignups);

// Admin: View all volunteers signed up for an event
router.get('/event/:eventId', protect, adminOnly, getVolunteersByEvent);

export default router;
