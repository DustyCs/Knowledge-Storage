import { Skill } from "../../models/Skill";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const getAllSkill = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const skills = await Skill.find({user_id: req.user});
        res.json(skills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting skills" });
    }
};

export const getSkill = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const { name } = req.params;
        const skill = await Skill.findById(name, { user_id: req.user });
        if (!skill) {
            res.status(404).json({ error: "Skill not found" });
            return;
        }
        res.json(skill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting skill" });
    }
};