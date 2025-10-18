import { Response } from 'express';
import Event from '../models/event.model';
import { AuthRequest } from '../types/authRequest'; // ✅ Custom typed request with .user

// Create a new event (Admin only)
export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, location, date, capacity } = req.body;
    const createdBy = req.user!._id; // ✅ Assert user is defined (non-null)

    const event = new Event({
      title,
      description,
      location,
      date,
      capacity,
      createdBy
    });

    const saved = await event.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Create Event Error:', err);
    res.status(500).json({ message: 'Failed to create event' });
  }
};

// Get all events (Public)
export const getAllEvents = async (_req: AuthRequest, res: Response) => {
  try {
    const events = await Event.find().sort({ date: 1 }).populate('createdBy', 'name email');
    res.status(200).json(events);
  } catch (err) {
    console.error('Get Events Error:', err);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

// Get single event by ID (Public)
export const getEventById = async (req: AuthRequest, res: Response) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get event' });
  }
};

// Update event (Admin only)
export const updateEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, location, date, capacity } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // ✅ Make sure only the creator can update
    if (event.createdBy.toString() !== req.user!._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.location = location || event.location;
    event.date = date || event.date;
    event.capacity = capacity || event.capacity;

    const updated = await event.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update event' });
  }
};

// Delete event (Admin only)
export const deleteEvent = async (req: AuthRequest, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // ✅ Only creator can delete
    if (event.createdBy.toString() !== req.user!._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await event.deleteOne();
    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event' });
  }
};

