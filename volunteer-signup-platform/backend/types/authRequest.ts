import { Request } from 'express';
import { IUser } from '../models/user.model'; // Adjust the path if needed

export interface AuthRequest extends Request {
  user?: IUser & { _id: string };
}





