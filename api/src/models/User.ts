// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: boolean; // 0 = admin, 1 = user
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Boolean, required: true, default: 1 },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
export { IUser };