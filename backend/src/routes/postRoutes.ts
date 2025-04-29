import express from 'express';
import { authMiddleware } from '../middleware/auth';
import createPost from '../controllers/Post/post_create';
import { updatePost } from '../controllers/Post/post_update';
import { getPost, getAllPost } from '../controllers/Post/post_get';
import { deletePost } from '../controllers/Post/post_delete';

require('dotenv').config();

const router = express.Router();

router.post('/create', authMiddleware, createPost);
router.put('/update/:id', authMiddleware, updatePost);
router.get('/get/:id', authMiddleware, getPost);
router.get('/get', authMiddleware, getAllPost);
router.delete('/delete/:id', authMiddleware, deletePost);



export default router;