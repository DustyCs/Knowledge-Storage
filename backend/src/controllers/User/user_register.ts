import bcrypt from 'bcryptjs';
import { User } from '../../models/User';
import { validationResult } from 'express-validator';
import {Request, Response} from 'express';

const registerUser = async (req: Request, res: Response): Promise<void> => {
        const { username, email, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ error: 'User already exists' });
                return;
            }
 
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });
            await user.save();

            res.json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: `Error registering user, email: ${email}, password: ${password}, username: ${username}` });
        }
    }

export default registerUser
 