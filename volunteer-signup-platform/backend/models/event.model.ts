import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  location: string;
  date: Date;
  createdBy: mongoose.Types.ObjectId;
  capacity: number;
}

const eventSchema: Schema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    capacity: { type: Number, required: true }
  },
  { timestamps: true }
);

const Event = mongoose.model<IEvent>('Event', eventSchema);
export default Event;
