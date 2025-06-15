import Event from '../models/Event.js';
import path from 'path';

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const cover = req.files?.cover?.[0];
    const gallery = req.files?.files || [];

    const event = await Event.create({
      title,
      description,
      date,
      location,
      imageUrl: cover ? path.join('uploads', path.basename(cover.path)) : '',
      gallery: gallery.map(file => path.join('uploads', path.basename(file.path))),
      createdBy: req.user.id,
    });

    res.status(201).json(event);
  } catch (err) {
    console.error('Create event error:', err);
    res.status(400).json({ error: err.message });
  }
};

// GET EVENTS
export const getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this event' });
    }

    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.date = req.body.date || event.date;
    event.location = req.body.location || event.location;

    if (req.files?.cover?.[0]) {
      event.imageUrl = path.join('uploads', path.basename(req.files.cover[0].path));
    }

    if (req.files?.files) {
      event.gallery = req.files.files.map(file =>
        path.join('uploads', path.basename(file.path))
      );
    }

    const updated = await event.save();
    res.status(200).json(updated);
  } catch (err) {
    console.error('Update event error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    await event.deleteOne();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error while deleting event' });
  }
};
