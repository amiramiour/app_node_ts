import express, { Request, Response } from 'express';
import { submitReactionTime, getReactionTimes } from '../controllers/reactionTimeController';
import auth from '../middleware/auth';

const router = express.Router();

// Soumettre un temps de réaction
router.post('/submit-reaction-time', auth, submitReactionTime);

// Récupérer les temps de réaction pour un utilisateur
router.get('/get-reaction-times', auth, getReactionTimes);

export default router;
