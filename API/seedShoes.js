import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './Models/Product.js';

dotenv.config();

const seedProducts = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/e-commerce`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB...");

        const shoes = [
            {
                name: "Air Max Pulse", brand: "Nike", price: 12995, color: "White/Red",
                category: "sneakers", gender: "men",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
                description: "The Air Max Pulse pulls inspiration from the London music scene, bringing an underground touch to the iconic Air Max line.",
                sizes: [{ size: "7", stock: 12 }, { size: "8", stock: 18 }, { size: "9", stock: 20 }, { size: "10", stock: 15 }]
            },
            {
                name: "UltraBoost Light", brand: "Adidas", price: 16999, color: "Core Black",
                category: "sports", gender: "unisex",
                image: "https://images.unsplash.com/photo-1560769622-675270575d5e?w=600&q=80",
                description: "Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever. The magic lies in the Light BOOST midsole.",
                sizes: [{ size: "6", stock: 5 }, { size: "7", stock: 10 }, { size: "8", stock: 25 }, { size: "9", stock: 12 }]
            },
            {
                name: "Chuck Taylor All Star", brand: "Converse", price: 4999, color: "White",
                category: "casual", gender: "unisex",
                image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
                description: "The unmistakable Chuck Taylor All Star Classic celebrates the iconic high top silhouette with a comfortable canvas upper.",
                sizes: [{ size: "5", stock: 30 }, { size: "6", stock: 20 }, { size: "7", stock: 15 }, { size: "8", stock: 40 }]
            },
            {
                name: "Classic Oxford Leather", brand: "Clarks", price: 5499, color: "Dark Brown",
                category: "formal", gender: "men",
                image: "https://images.unsplash.com/photo-1618677063469-8d5f30e9d6bf?w=600&q=80",
                description: "Handcrafted from premium leather, these classic oxfords offer timeless elegance and unmatched comfort for all-day wear.",
                sizes: [{ size: "8", stock: 8 }, { size: "9", stock: 14 }, { size: "10", stock: 10 }]
            },
            {
                name: "Premium Suede Loafers", brand: "Hush Puppies", price: 4299, color: "Tan",
                category: "formal", gender: "men",
                image: "https://images.unsplash.com/photo-1551107699-5fe150fef07e?w=600&q=80",
                description: "Slip into style with these premium suede loafers. Perfect for both office settings and weekend outings.",
                sizes: [{ size: "7", stock: 10 }, { size: "8", stock: 5 }, { size: "9", stock: 2 }]
            },
            {
                name: "Classic Slip-On", brand: "Vans", price: 3999, color: "Checkerboard",
                category: "casual", gender: "unisex",
                image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
                description: "The Classic Slip-On features sturdy low profile slip-on canvas uppers with the iconic Vans checkerboard print.",
                sizes: [{ size: "5", stock: 10 }, { size: "6", stock: 20 }, { size: "7", stock: 30 }]
            },
            {
                name: "ZoomX Invincible Run 3", brand: "Nike", price: 15495, color: "Volt Green",
                category: "sports", gender: "women",
                image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&q=80",
                description: "Designed to keep you on the run, the Nike ZoomX Invincible Run Flyknit 3 offers maximum cushioning and a super responsive ride.",
                sizes: [{ size: "5", stock: 12 }, { size: "6", stock: 18 }, { size: "7", stock: 9 }]
            },
            {
                name: "Arizona Soft Footbed", brand: "Birkenstock", price: 8990, color: "Mocha",
                category: "sandals", gender: "unisex",
                image: "https://images.unsplash.com/photo-1595950653106-6c9ccae518c0?w=600&q=80",
                description: "The often imitated, never duplicated, category-defining, two-strap Arizona sandal comes with a soft suede footbed.",
                sizes: [{ size: "6", stock: 15 }, { size: "7", stock: 25 }, { size: "8", stock: 20 }]
            },
             {
                name: "Kids LiteRide 360 Clog", brand: "Crocs", price: 2995, color: "Navy Red",
                category: "sandals", gender: "kids",
                image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&q=80",
                description: "Discover a new level of comfort and ease in these innovative clogs. Featuring plush LiteRide foam footbeds.",
                sizes: [{ size: "4", stock: 30 }, { size: "5", stock: 25 }]
            },
            {
                name: "6-Inch Premium Waterproof", brand: "Timberland", price: 14999, color: "Wheat",
                category: "boots", gender: "men",
                image: "https://images.unsplash.com/photo-1549298916-b5ce922438bab?w=600&q=80",
                description: "Our original Timberland boot, first designed nearly 40 years ago and remains a staple in millions of closets, mudrooms and garages.",
                sizes: [{ size: "8", stock: 10 }, { size: "9", stock: 12 }, { size: "10", stock: 8 }, { size: "11", stock: 5 }]
            },
            {
                name: "Women's 1460 Smooth Leather", brand: "Dr. Martens", price: 13999, color: "Black",
                category: "boots", gender: "women",
                image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80",
                description: "The 1460 is the original Dr. Martens boot. Its instantly recognizable DNA looks like this: 8 eyes, classic Dr. Martens Smooth leather.",
                sizes: [{ size: "5", stock: 20 }, { size: "6", stock: 15 }, { size: "7", stock: 10 }]
            },
            {
                name: "RS-X 3D", brand: "Puma", price: 8999, color: "White/Blue",
                category: "sneakers", gender: "men",
                image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
                description: "The RS-X is back. The future-retro silhouette of this sneaker returns with progressive aesthetic and angular details.",
                sizes: [{ size: "7", stock: 14 }, { size: "8", stock: 22 }, { size: "9", stock: 10 }]
            },
            {
                name: "Deviate Nitro 2", brand: "Puma", price: 11999, color: "Sunset Pink",
                category: "sports", gender: "women",
                image: "https://images.unsplash.com/photo-1595950653106-6c9ccae518c0?w=600&q=80",
                description: "The Deviate NITRO 2 – just like v1, only improved. It’s the max cushion, max performance running shoe.",
                sizes: [{ size: "5", stock: 10 }, { size: "6", stock: 12 }, { size: "7", stock: 8 }]
            },
            {
                name: "Gel-Kayano 30", brand: "ASICS", price: 14999, color: "Midnight Blue",
                category: "sports", gender: "men",
                image: "https://images.unsplash.com/photo-1560769622-675270575d5e?w=600&q=80",
                description: "The GEL-KAYANO 30 shoe combines maximum support with ultimate comfort for complete peace of mind.",
                sizes: [{ size: "8", stock: 10 }, { size: "9", stock: 12 }, { size: "10", stock: 18 }]
            },
            {
                name: "Stan Smith", brand: "Adidas", price: 7599, color: "Cloud White / Green",
                category: "sneakers", gender: "unisex",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
                description: "The Stan Smith has defined crisp, clean style for decades. These shoes honor the original with a minimalist leather build.",
                sizes: [{ size: "6", stock: 30 }, { size: "7", stock: 40 }, { size: "8", stock: 50 }, { size: "9", stock: 30 }]
            },
            {
                name: "Formal Brogue Leather", brand: "Woodland", price: 4595, color: "Camel",
                category: "formal", gender: "men",
                image: "https://images.unsplash.com/photo-1618677063469-8d5f30e9d6bf?w=600&q=80",
                description: "Tough yet highly stylish formal brogues from Woodland. Engineered for heavy durability and classic looks.",
                sizes: [{ size: "7", stock: 10 }, { size: "8", stock: 15 }, { size: "9", stock: 20 }]
            },
            {
                name: "Platform Slide", brand: "Crocs", price: 3495, color: "Bone",
                category: "sandals", gender: "women",
                image: "https://images.unsplash.com/photo-1595950653106-6c9ccae518c0?w=600&q=80",
                description: "The Classic Crocs Slide gets a boost. Featuring a heightened, platform outsole that supports the versatile upper.",
                sizes: [{ size: "5", stock: 30 }, { size: "6", stock: 45 }, { size: "7", stock: 20 }]
            },
            {
                name: "Kids Revolution 6", brand: "Nike", price: 3995, color: "Pink Foam",
                category: "sports", gender: "kids",
                image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&q=80",
                description: "Prioritize comfort for growing athletes. The Nike Revolution 6 offers lightweight, breathable support for daily play.",
                sizes: [{ size: "4", stock: 20 }, { size: "5", stock: 25 }]
            },
            {
                name: "Chuck 70 Vintage", brand: "Converse", price: 6999, color: "Parchment",
                category: "casual", gender: "unisex",
                image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
                description: "The Chuck 70 pays homage to the original 1970s model with premium materials and extraordinary attention to detail.",
                sizes: [{ size: "6", stock: 15 }, { size: "7", stock: 20 }, { size: "8", stock: 25 }, { size: "9", stock: 10 }]
            },
            {
                name: "Chelsea Boot", brand: "Hush Puppies", price: 7999, color: "Black Suede",
                category: "boots", gender: "men",
                image: "https://images.unsplash.com/photo-1549298916-b5ce922438bab?w=600&q=80",
                description: "A refined Chelsea boot crafted from plush suede. Features elastic side panels and our signature bounce footbed.",
                sizes: [{ size: "8", stock: 10 }, { size: "9", stock: 20 }, { size: "10", stock: 15 }]
            }
        ];

        // Format dates and total quantity automatically just like pre-save hooks
        const formattedShoes = shoes.map(shoe => {
            shoe.quantity = shoe.sizes.reduce((sum, s) => sum + s.stock, 0);
            return shoe;
        });

        await Product.insertMany(formattedShoes);
        console.log(`Successfully added ${formattedShoes.length} shoe products to the catalog!`);
        process.exit(0);
    } catch (err) {
        console.error("Error seeding products:", err);
        process.exit(1);
    }
};

seedProducts();
