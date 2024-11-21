import express from 'express'
import { connectDb } from './config/dbconfig.js'
import user from './Routes/user.js'
import product from './Routes/product.js'



const PORT = 3000
const app = express()
connectDb();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes 
app.use('/api/user', user)
app.use('/api/product', product)




app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})