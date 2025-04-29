import { Post } from '../../models/Post';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const createPost = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const { title, content, tags } = req.body;
        const user_id = req.user
        const post = new Post({ title, content, user_id, tags });
        await post.save();
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating post' });
    }
};

export default createPost