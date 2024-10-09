import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../index'; // Adjust the path to your Express app
import User, { IUser } from '../models/User';
import ReactionTime, { IReactionTime } from '../models/ReactionTime';
import argon2 from 'argon2';

describe('Reaction Time Routes Test', () => {
  let userToken: string;
  let userId: mongoose.Types.ObjectId;

  // Connect to the in-memory database before running tests
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb');
  });

  // Clear the database after each test
  afterEach(async () => {
    await User.deleteMany({});
    await ReactionTime.deleteMany({});
  });

  // Disconnect from the in-memory database after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Create a user
    const user = new User({
      username: 'user',
      email: 'user@example.com',
      password: await argon2.hash('userpassword', { type: argon2.argon2id }),
      role: true,
    });
    const savedUser = await user.save();
    userId = savedUser._id as mongoose.Types.ObjectId; // Explicitly cast _id

    // Generate a token for the user
    userToken = jwt.sign({ _id: userId, email: user.email, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  });

  it('should submit a reaction time', async () => {
    const response = await request(app)
      .post('/submit-reaction-time')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ time: 123 });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Reaction time submitted successfully');

    const reactionTime = await ReactionTime.findOne({ user_id: userId });
    expect(reactionTime).toBeDefined();
    expect(reactionTime?.time).toBe(123);
  });

  it('should retrieve reaction times for a user', async () => {
    // Submit a reaction time first
    const newReactionTime: IReactionTime = new ReactionTime({
      user_id: userId,
      time: 123,
    });
    await newReactionTime.save();

    const response = await request(app)
      .get('/get-reaction-times')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBe(1);
    expect(response.body[0].time).toBe(123);
  });

  it('should return 401 for unauthenticated requests to submit reaction time', async () => {
    const response = await request(app)
      .post('/submit-reaction-time')
      .send({ time: 123 });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });

  it('should return 401 for unauthenticated requests to get reaction times', async () => {
    const response = await request(app)
      .get('/get-reaction-times');

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });
});