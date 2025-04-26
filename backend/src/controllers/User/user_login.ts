import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../models/User';
import {Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWTKEY as string;

const loginUser = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({ msg: 'User not found' });
                return;
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(400).json({ msg: 'Invalid password' });
                return;
            }

            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });
            res.json({
                token,
                user: { id: user._id, username: user.username, email: user.email, role: user.role },
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error logging in user' });
        }
    }

export default loginUser;