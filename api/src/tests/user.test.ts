import mongoose from 'mongoose';
import User, { IUser } from '../models/User';
import argon2 from 'argon2';

describe('User Model Test', () => {
  // Connect to the in-memory database before running tests
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Clear the database after each test
  afterEach(async () => {
    await User.deleteMany({});
  });

  // Disconnect from the in-memory database after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a user with hashed password', async () => {
    const username = 'user';
    const email = 'testuser@example.com';
    const password = 'password123';
    const role = '1';

    const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
    const newUser: IUser = new User({ username, email, password: hashedPassword, role });
    const savedUser = await newUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(username);
    expect(savedUser.email).toBe(email);
    expect(savedUser.role).toBe(role);
    const isMatch = await argon2.verify(savedUser.password, password);
    expect(isMatch).toBe(true);
  });

  it('should not save user with duplicate email', async () => {
    const user1: IUser = new User({
      username: 'user1',
      email: 'duplicate@example.com',
      password: await argon2.hash('password123', { type: argon2.argon2id }),
      role: '1',
    });
    await user1.save();

    const user2: IUser = new User({
      username: 'user2',
      email: 'duplicate@example.com',
      password: await argon2.hash('password456', { type: argon2.argon2id }),
      role: '1',
    });

    let err;
    try {
      await user2.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.code).toBe(11000); // Duplicate key error code
  });

  it('should create an admin user with hashed password', async () => {
    const username = 'admin';
    const email = 'admin@example.com';
    const password = 'adminpassword';
    const role = '0';

    const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
    const newAdmin: IUser = new User({ username, email, password: hashedPassword, role });
    const savedAdmin = await newAdmin.save();

    expect(savedAdmin._id).toBeDefined();
    expect(savedAdmin.username).toBe(username);
    expect(savedAdmin.email).toBe(email);
    expect(savedAdmin.role).toBe(role);
    const isMatch = await argon2.verify(savedAdmin.password, password);
    expect(isMatch).toBe(true);
  });
});