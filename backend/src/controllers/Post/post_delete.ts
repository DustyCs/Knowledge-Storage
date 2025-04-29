import { Post } from '../../models/Post';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const deletePost = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const { id } = req.params;
        const user_id = req.user

        // delete post owned by user
        const post = await Post.findOneAndDelete({ _id: id, user_id });
        
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;+` `
        }

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating post' });

    }
    
}

