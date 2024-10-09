import express, { Request, Response } from 'express';
import { register, login, logout } from '../controllers/authController';
import auth from '../middleware/auth';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', auth, logout);

// Users route (protected)
router.get('/users', auth, async (req: Request, res: Response) => {
  // Ajoutez ici la logique pour récupérer les utilisateurs, si nécessaire
});

export default router;
