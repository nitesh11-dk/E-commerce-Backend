import express from 'express';
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../Controllers/product.js';
import { AuthenticateAdmin, AuthenticateUser } from '../Middlewares/auth.js';

const router = express.Router();



//  product route 
router.get('/all', getAllProducts);
router.get('/:id', getProductById);

// ADMIN
router.post('/add', AuthenticateUser, AuthenticateAdmin, addProduct); // => /api/product/add
router.put('/:id', AuthenticateUser, AuthenticateAdmin, updateProduct);
router.delete('/:id', AuthenticateUser, AuthenticateAdmin, deleteProduct);

export default router;