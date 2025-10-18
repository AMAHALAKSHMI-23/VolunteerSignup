import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string; // ✅ add this line
  name: string;
  email: string;
  password: string;
  role: 'volunteer' | 'admin';
}


const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['volunteer', 'admin'], default: 'volunteer' },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
