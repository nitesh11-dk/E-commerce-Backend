import express from 'express';
import { allUsers, loginUser, registerUser } from '../Controllers/user.js';

const router = express.Router();


//  user route 
router.post('/register', registerUser); // => /api/user/register
router.post('/login', loginUser);
router.get('/all', allUsers);


export default router;