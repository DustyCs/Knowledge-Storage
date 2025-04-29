import { Follows } from "../../models/Follows";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const removeFollower = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const { follower_id, following_id } = req.body;
        const follower = await Follows.findOneAndDelete({ follower_id, following_id });
        res.json(follower);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error removing follower" });
    }
};