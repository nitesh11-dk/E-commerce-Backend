import express from 'express'
import { connectDb } from './config/dbconfig.js'
import cookieParser from 'cookie-parser';
import user from './Routes/user.js'
import product from './Routes/product.js'
import cart from './Routes/cart.js'
import address from './Routes/address.js'


const PORT = 3000
const app = express()
connectDb();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes 
app.use('/api/user', user)
app.use('/api/product', product)
app.use('/api/cart', cart)
app.use('/api/address', address)



app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})