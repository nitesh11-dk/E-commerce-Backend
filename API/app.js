import express from 'express'
import { connectDb } from './config/dbconfig.js'
import cors from 'cors'

import user from './Routes/user.js'
import product from './Routes/product.js'
import cart from './Routes/cart.js'
import address from './Routes/address.js'

const PORT = 3000
const app = express()
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



app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})