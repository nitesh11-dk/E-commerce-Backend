import express from 'express';
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../Controllers/product.js';

const router = express.Router();



//  product route 
router.post('/add', addProduct); // => /api/product/add
router.get('/all', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;