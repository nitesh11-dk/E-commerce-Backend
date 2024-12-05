import express from 'express';
import { getProfile, loginUser, registerUser, allUsers, deleteUser, loginAdmin, isUserAdmin } from '../Controllers/user.js';
import { AuthenticateAdmin, AuthenticateUser } from "../Middlewares/auth.js";
const router = express.Router();


//  user route 
router.post('/register', registerUser); // => /api/user/register
router.post('/login', loginUser);
router.post('/loginadmin', loginAdmin);
router.get('/checkadmin', isUserAdmin);
router.get('/profile', AuthenticateUser, getProfile);
//  ADMIN 
router.get('/all', AuthenticateUser, AuthenticateAdmin, allUsers);
router.delete('/:id', AuthenticateUser, AuthenticateAdmin, deleteUser);

export default router;