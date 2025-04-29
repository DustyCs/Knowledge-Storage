import { Skill } from "../../models/Skill";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const createSkill = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const { title, profiency } = req.body;
        const user_id = req.user;
        const skill = new Skill({ title, profiency, user_id });
        await skill.save();
        res.json(skill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating skill" });
    }
}