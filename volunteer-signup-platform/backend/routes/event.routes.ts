import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from '../controllers/event.controller';
import { protect, adminOnly } from '../middlewares/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', getAllEvents); // GET /api/events
router.get('/:id', getEventById); // GET /api/events/:id

// Admin-only routes
router.post('/', protect, adminOnly, createEvent); // POST /api/events
router.put('/:id', protect, adminOnly, updateEvent); // PUT /api/events/:id
router.delete('/:id', protect, adminOnly, deleteEvent); // DELETE /api/events/:id

export default router;
