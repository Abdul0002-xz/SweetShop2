import express from 'express';
import { registerUSer, loginUser, logOutUser } from '../controller/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUSer);
router.post('/login', loginUser);
router.post('/logout', verifyJWT,logOutUser)

export default router;