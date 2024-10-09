// src/tests/reactionTime.test.ts
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import ReactionTime, { IReactionTime } from '../models/ReactionTime';

describe('ReactionTime Model Test', () => {
  let mongoServer: MongoMemoryServer;

  // Connect to the in-memory database before running tests
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  // Clear the database after each test
  afterEach(async () => {
    await ReactionTime.deleteMany({});
  });

  // Disconnect from the in-memory database after all tests
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it('should create a reaction time record', async () => {
    const reactionTimeData: IReactionTime = new ReactionTime({
      user_id: new mongoose.Types.ObjectId(),
      time: 250,
    });
    const savedReactionTime = await reactionTimeData.save();

    expect(savedReactionTime._id).toBeDefined();
    expect(savedReactionTime.user_id).toBe(reactionTimeData.user_id);
    expect(savedReactionTime.time).toBe(reactionTimeData.time);
    expect(savedReactionTime.createdAt).toBeDefined();
  });

  it('should not create a reaction time record without user_id', async () => {
    const reactionTimeData = new ReactionTime({
      time: 250,
    });

    let err: any;
    try {
      await reactionTimeData.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.user_id).toBeDefined();
  });

  it('should not create a reaction time record without time', async () => {
    const reactionTimeData = new ReactionTime({
      user_id: new mongoose.Types.ObjectId(),
    });

    let err: any;
    try {
      await reactionTimeData.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.time).toBeDefined();
  });
});
