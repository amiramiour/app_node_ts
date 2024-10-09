// models/ReactionTime.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IReactionTime extends Document {
  user_id: mongoose.Types.ObjectId;
  time: number;
  createdAt: Date;
}

const reactionTimeSchema: Schema = new Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  time: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ReactionTime = mongoose.model<IReactionTime>('ReactionTime', reactionTimeSchema);

export default ReactionTime;
export { IReactionTime };