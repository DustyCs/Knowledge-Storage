import { Follows } from "../../models/Follows";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const getFollowers = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const followers = await Follows.find({ following_id: req.params.id });
        res.json(followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting followers" });
    }
};