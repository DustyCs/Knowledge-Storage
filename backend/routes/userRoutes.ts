import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { body, validationResult } from 'express-validator';

require('dotenv').config();


const JWT_SECRET = process.env.JWTKEY as string;

const router = express.Router();

router.post('/register', 
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ]
),
async (req, res) => {
    const { username, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering user' });
    }
};

router.post('/login', 
    [
        body('email').isEmail().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.json({ 
            token, 
            user: { id: user._id, username: user.username, email: user.email, role: user.role } 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in user' });
    }
}
);

module.export