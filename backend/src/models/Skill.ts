import mongoose from 'mongoose'

const SkillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    profiency: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'beginner',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

export const Skill = mongoose.model('Skill', SkillSchema)