import mongoose, { Schema, Document } from 'mongoose';

export interface ISignUp extends Document {
  userId: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  status: 'registered' | 'cancelled';
}

const signUpSchema: Schema = new Schema<ISignUp>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    status: {
      type: String,
      enum: ['registered', 'cancelled'],
      default: 'registered'
    }
  },
  { timestamps: true }
);

const SignUp = mongoose.model<ISignUp>('SignUp', signUpSchema);
export default SignUp;
