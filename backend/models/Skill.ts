import mongoose from 'mongoose'

const Skill = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    profiency: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'beginner',
        required: true,
    }
})

module.exports = mongoose.model('Skill', Skill)