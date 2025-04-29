import { Skill } from "../../models/Skill";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const updateSkill = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const { title, profiency } = req.body;
        const user_id = req.user;
        const skill = await Skill.findOneAndUpdate({ title, profiency, user_id });
        if (!skill) {
            res.status(404).json({ error: 'Skill not found' });
            return;
        }
        res.json(skill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating skill" });
    }
}