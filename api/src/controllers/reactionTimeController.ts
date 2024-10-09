import { Request, Response } from 'express';
import ReactionTime from '../models/ReactionTime';

export const submitReactionTime = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const reactionTime = new ReactionTime({
      user_id: req.user._id, // Utilisation de _id
      time: req.body.time,
    });

    await reactionTime.save();

    res.status(201).json({ message: 'Reaction time submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getReactionTimes = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const reactionTimes = await ReactionTime.find({ user_id: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json(reactionTimes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
