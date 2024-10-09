// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importer le middleware CORS

import authRoutes from './routes/auth';
import reactionTimeRoutes from './routes/reactionTime';
import connectDB from './config/db'; // Importer la fonction de connexion à la DB

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB(); // Connexion à la base de données

app.get('/', (req, res) => {
  res.send('Hello World! MongoDB connected');
});

app.use('/api/auth', authRoutes);
app.use('/api/reaction-time', reactionTimeRoutes);

export default app;