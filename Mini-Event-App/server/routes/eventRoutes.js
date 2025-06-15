import express from 'express';
import {
  createEvent,
  deleteEvent,
  getUserEvents,
  updateEvent,
} from '../controllers/eventController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'files', maxCount: 10 },
  ]),
  createEvent
);

router.get('/', authenticateToken, getUserEvents);

router.put(
  '/:id',
  authenticateToken,
  upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'files', maxCount: 10 },
  ]),
  updateEvent
);

router.delete('/:id', authenticateToken, deleteEvent);

export default router;
