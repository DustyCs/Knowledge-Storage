import express from 'express';

import loginUser from '../controllers/User/user_login';
import registerUser from '../controllers/User/user_register';
import { userRegisterValidation, userLoginValidation } from '../middleware/userValidation';

require('dotenv').config();

const router = express.Router();

router.post('/register', [...userRegisterValidation], registerUser);
router.post('/login', [...userLoginValidation], loginUser);

export default router;