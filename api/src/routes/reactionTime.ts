// routes/reactionTime.ts
import express, { Request, Response } from 'express';
import auth from '../middleware/auth';
import ReactionTime, { IReactionTime } from '../models/ReactionTime';

const router = express.Router();

// Soumettre un temps de réaction
router.post('/submit-reaction-time', auth, async (req: Request, res: Response) => {
  const { time } = req.body;

  try {
    const newReactionTime: IReactionTime = new ReactionTime({
      user_id: req.user.userId,
      time,
    });
    await newReactionTime.save();
    res.status(201).json({ message: 'Reaction time submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error submitting reaction time' });
  }
});

// Récupérer les temps de réaction pour un utilisateur
router.get('/get-reaction-times', auth, async (req: Request, res: Response) => {
  try {
    const reactionTimes = await ReactionTime.find({ user_id: req.user.userId }).sort({ createdAt: -1 });
    res.json(reactionTimes);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving reaction times' });
  }
});

export default router;

