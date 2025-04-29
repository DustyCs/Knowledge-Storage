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
            const login_email = email.toLowerCase();

            const user = await User.findOne({ login_email });
            if (!user) {
                res.status(400).json({ msg: 'User not found' });
                return;
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(400).json({ msg: 'Invalid password' });
                return;
            }

            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '4h' });
            res
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // HTTPS only in prod
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            })
            .json({
                msg: 'User logged in successfully',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error logging in user' });
        }
    }

export default loginUser;