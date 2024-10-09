import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { Request, Response } from 'express';

// Register handler
export const register = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
    const newUser: IUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Login handler
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

// Logout handler
export const logout = (req: Request, res: Response) => {
  // La déconnexion consiste à informer le client de supprimer le jeton.
  res.json({ message: 'Successfully logged out' });
};
