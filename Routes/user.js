import express from 'express';
import { allUsers, getProfile, loginUser, registerUser } from '../Controllers/user.js';
import { AuthenticateUser } from '../Middlewares/auth.js';
const router = express.Router();


//  user route 
router.post('/register', registerUser); // => /api/user/register
router.post('/login', loginUser);
router.get('/all', allUsers);
router.get('/profile', AuthenticateUser, getProfile);


export default router;