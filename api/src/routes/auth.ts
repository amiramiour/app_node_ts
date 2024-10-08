// routes/auth.ts
import express, { Request, Response } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const router = express.Router();

// Register route
router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
    const newUser: IUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login route
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Users route
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, 'username password'); // Adjust fields as necessary
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;