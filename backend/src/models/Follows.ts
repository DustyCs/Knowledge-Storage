import mongoose from "mongoose"

const FollowsSchema = new mongoose.Schema({
    follower_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    following_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

export const Follows = mongoose.model('Follows', FollowsSchema)