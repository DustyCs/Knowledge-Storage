// import jwt from 'jsonwebtoken';
import express from 'express';
// import bcrypt from 'bcryptjs';
// import { User } from '../models/User';
// import { body, validationResult } from 'express-validator';
// import {Request, Response} from 'express';

import loginUser from '../controllers/User/user_login';
import registerUser from '../controllers/User/user_register';
import { userRegisterValidation, userLoginValidation } from '../middleware/userValidation';

require('dotenv').config();


// const JWT_SECRET = process.env.JWTKEY as string;

const router = express.Router();

router.post(
    '/register',
    // [
    //     body('username').notEmpty().withMessage('Username is required'),
    //     body('email').isEmail().withMessage('Email is required'),
    //     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    // ],
    userRegisterValidation,
    // async (req: Request, res: Response): Promise<void> => {
    //     const { username, email, password } = req.body;
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         res.status(400).json({ errors: errors.array() });
    //         return;
    //     }

    //     try {
    //         const existingUser = await User.findOne({ email });
    //         if (existingUser) {
    //             res.status(400).json({ error: 'User already exists' });
    //             return;
    //         }

    //         const hashedPassword = await bcrypt.hash(password, 10);
    //         const user = new User({ username, email, password: hashedPassword });
    //         await user.save();

    //         res.json({ message: 'User registered successfully' });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Error registering user' });
    //     }
    // }
    registerUser
);

router.post(
    '/login',
    // [
    //     body('email').isEmail().withMessage('Email is required'),
    //     body('password').notEmpty().withMessage('Password is required'),
    // ],
    userLoginValidation,
    // async (req: Request, res: Response): Promise<void> => {
    //     const { email, password } = req.body;

    //     try {
    //         const user = await User.findOne({ email });
    //         if (!user) {
    //             res.status(400).json({ msg: 'User not found' });
    //             return;
    //         }

    //         const isPasswordValid = await bcrypt.compare(password, user.password);
    //         if (!isPasswordValid) {
    //             res.status(400).json({ msg: 'Invalid password' });
    //             return;
    //         }

    //         const token = jwt.sign({ id: user._id }, JWT_SECRET);
    //         res.json({
    //             token,
    //             user: { id: user._id, username: user.username, email: user.email, role: user.role },
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Error logging in user' });
    //     }
    // }
    loginUser
);

export default router;