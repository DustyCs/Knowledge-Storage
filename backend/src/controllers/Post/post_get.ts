import { Post } from '../../models/Post';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';


export const getPost = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const userId = req.user;
        const { id } = req.params;
        const post = await Post.findById(id, { user_id: userId });
        
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating post' });

    }
    
}

export const getAllPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user;
        const posts = await Post.find({ user_id: userId });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting posts' });
    }
} 