import express from 'express'
import { connectDb } from './config/dbconfig.js'
import cors from 'cors'
import user from './Routes/user.js'
import product from './Routes/product.js'
import cart from './Routes/cart.js'
import address from './Routes/address.js'
import payment from './Routes/payment.js'
const PORT = process.env.PORT || 3000
const app = express()
import dotenv from 'dotenv'

dotenv.config()
connectDb();

app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes 
app.use('/api/user', user)
app.use('/api/product', product)
app.use('/api/cart', cart)
app.use('/api/address', address)
app.use('/api/payment', payment)

//  here also the authication for the user and the admin is also commited  and done 

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})