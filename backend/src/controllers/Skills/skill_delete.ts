import { Skill } from "../../models/Skill";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const { id } = req.params;
        const skill = await Skill.findByIdAndDelete(id);
        if (!skill) {
            res.status(404).json({ error: 'Skill not found' }); // won't this work? since it's already deleted?
            return;
        }
        res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting skill' });
    }
}