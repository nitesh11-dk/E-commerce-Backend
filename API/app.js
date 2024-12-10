import express from 'express'
import { connectDb } from './config/dbconfig.js'
import cors from 'cors'
import Product from './Models/Product.js';
import user from './Routes/user.js'
import product from './Routes/product.js'
import cart from './Routes/cart.js'
import address from './Routes/address.js'
import payment from './Routes/payment.js'
const PORT = process.env.PORT || 3000
const app = express()
import dotenv from 'dotenv'
import mongoose from 'mongoose';

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



const data = [
    {
        name: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
        description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
        price: 64,
        image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
        category: "electronics"
    },
    {
        name: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
        description: "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
        price: 109,
        image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
        category: "electronics"
    },
    {
        name: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
        description: "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
        price: 109,
        image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
        category: "electronics"
    },
    {
        name: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
        description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
        price: 114,
        image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
        category: "electronics"
    },
    {
        name: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
        description: "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
        price: 599,
        image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
        category: "electronics"
    },
    {
        name: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED",
        description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
        price: 999.99,
        image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
        category: "electronics"
    }
];


const insertProducts = async () => {
  try {
    await Product.insertMany(data); /
    console.log('Products inserted successfully');
    mongoose.connection.close(); // Close the DB connection
  } catch (error) {
    console.error('Error inserting products:', error);
  }
};

// insertProducts();




app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})