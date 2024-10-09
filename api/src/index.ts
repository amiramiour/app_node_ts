import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import reactionTimeRoutes from './routes/reactionTime';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World! MongoDB connected');
});

app.use('/api/auth', authRoutes);
app.use('/api/reaction-time', reactionTimeRoutes);

export default app;