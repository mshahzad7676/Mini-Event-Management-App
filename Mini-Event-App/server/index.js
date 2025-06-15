import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';

import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));

app.use('/api/users', authRoutes);
app.use('/api/events', eventRoutes);
