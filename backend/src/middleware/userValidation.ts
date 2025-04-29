import { body } from 'express-validator';

export const userRegisterValidation = 
     [
            body('username').notEmpty().withMessage('Username is required'),
            body('email').isEmail().withMessage('Email is required'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ];

export const userLoginValidation = 
        [
            body('email').isEmail().withMessage('Email is required'),
            body('password').notEmpty().withMessage('Password is required'),
        ];


