import mongoose from "mongoose";

// Standard shoe sizes (Indian/EU mix)
export const SHOE_SIZES = ["4", "5", "6", "7", "8", "9", "10", "11", "12"];

export const SHOE_CATEGORIES = ["sneakers", "formal", "sandals", "sports", "boots", "casual"];

export const GENDERS = ["men", "women", "unisex", "kids"];

const sizeStockSchema = new mongoose.Schema({
    size: { type: String, required: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
}, { _id: false });

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0, min: 0 },
    image: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: SHOE_CATEGORIES,
        lowercase: true,
    },
    gender: {
        type: String,
        required: true,
        enum: GENDERS,
        lowercase: true,
    },
    color: { type: String, default: "Black", trim: true },
    // Per-size stock breakdown
    sizes: {
        type: [sizeStockSchema],
        default: [],
    },
    // Total stock = sum of sizes[].stock (kept in sync)
    quantity: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: false });

// Auto-compute total quantity from sizes before saving
productSchema.pre("save", function (next) {
    if (this.sizes && this.sizes.length > 0) {
        this.quantity = this.sizes.reduce((sum, s) => sum + (s.stock || 0), 0);
    }
    next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;