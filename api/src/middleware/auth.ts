import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/User';

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    
    // Cast verified object to IUser by fetching the user from DB
    const user = await User.findById(verified._id) as IUser;

    if (!user) {
      return res.status(401).send({ error: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send({ error: 'Invalid token.' });
  }
};

export default auth;
