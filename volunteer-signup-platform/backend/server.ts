// server.ts

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import eventRoutes from './routes/event.routes';
import signupRoutes from './routes/signup.routes';
import errorMiddleware from './middlewares/error.middleware';
import './types'; // 👈 This ensures TypeScript loads your global types


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Welcome Route (homepage)
app.get('/', (_req, res) => {
  res.send('🎉 Volunteer Signup API is running');
});

// 🛣️ Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/signups', signupRoutes);

// ❌ Error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

