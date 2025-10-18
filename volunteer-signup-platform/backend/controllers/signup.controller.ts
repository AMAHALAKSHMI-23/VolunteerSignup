import { Response } from 'express';
import { AuthRequest } from '../types/authRequest';

import SignUp from '../models/signup.model';
import Event from '../models/event.model';

// Register for an event (volunteer only)
export const registerForEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { eventId } = req.body;
    const userId = req.user?._id;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const existing = await SignUp.findOne({ userId, eventId });
    if (existing) {
      return res.status(409).json({ message: 'Already registered for this event' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const signup = new SignUp({
      userId,
      eventId,
      status: 'registered'
    });

    await signup.save();
    res.status(201).json({ message: 'Successfully registered' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register for event' });
  }
};

// Cancel signup (volunteer)
export const cancelRegistration = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { eventId } = req.params;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const signup = await SignUp.findOne({ userId, eventId });

    if (!signup) {
      return res.status(404).json({ message: 'Not registered for this event' });
    }

    signup.status = 'cancelled';
    await signup.save();

    res.status(200).json({ message: 'Registration cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to cancel registration' });
  }
};

// View all events a user is registered for
export const getMySignups = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const signups = await SignUp.find({ userId, status: 'registered' })
      .populate({
        path: 'eventId',
        model: 'Event',
      });

    // Map populated eventId to "event" for frontend consistency
    const formattedSignups = signups.map(signup => ({
      _id: signup._id,
      status: signup.status,
      event: signup.eventId, // ✅ Now accessible via signup.event
    }));

    res.status(200).json(formattedSignups);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your events' });
  }
};

// Admin: View volunteers for a specific event
export const getVolunteersByEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { eventId } = req.params;

    const volunteers = await SignUp.find({ eventId, status: 'registered' })
      .populate('userId', 'name email');

    res.status(200).json(volunteers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch volunteers' });
  }
};

