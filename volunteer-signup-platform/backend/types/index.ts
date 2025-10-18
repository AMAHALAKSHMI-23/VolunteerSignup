import { Request } from 'express';
import { IUser } from '../models/user.model';

export interface AuthRequest extends Request {
  user?: IUser & { _id: string }; // ensure _id is a string
}

