import express from 'express';
import { getAllUsers, getUserById } from '../controllers/user.controller';
import { protect, adminOnly } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', protect, adminOnly, getAllUsers);      
router.get('/:id', protect, adminOnly, getUserById);   

export default router;
