import Product from "../Models/Product.js";

// get all products
export const getAllProducts = async (req, res) => {
    try {
        const { category, gender, search } = req.query;
        const filter = {};
        if (category) filter.category = category.toLowerCase();
        if (gender) filter.gender = gender.toLowerCase();
        if (search) filter.name = { $regex: search, $options: "i" };

        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ products, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Products not found", success: false });
    }
};

// get product by id
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found", success: false });
        res.status(200).json({ product, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Product not found with this id", success: false });
    }
};

// add product
export const addProduct = async (req, res) => {
    try {
        const { name, brand, description, price, image, category, gender, color, sizes, quantity } = req.body;

        // Build sizes array if provided as JSON string
        let parsedSizes = sizes;
        if (typeof sizes === "string") {
            try { parsedSizes = JSON.parse(sizes); } catch { parsedSizes = []; }
        }

        const product = new Product({
            name, brand, description, price, image,
            category: category?.toLowerCase(),
            gender: gender?.toLowerCase(),
            color,
            sizes: parsedSizes || [],
            quantity: parsedSizes?.length > 0
                ? parsedSizes.reduce((s, sz) => s + (parseInt(sz.stock) || 0), 0)
                : (parseInt(quantity) || 0),
        });

        await product.save();
        res.status(201).json({ message: "Product added successfully", success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};

// update product
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found", success: false });

        const { sizes, quantity, category, gender, ...rest } = req.body;

        let parsedSizes = sizes;
        if (typeof sizes === "string") {
            try { parsedSizes = JSON.parse(sizes); } catch { parsedSizes = undefined; }
        }

        const updateData = {
            ...rest,
            ...(category && { category: category.toLowerCase() }),
            ...(gender && { gender: gender.toLowerCase() }),
        };

        if (parsedSizes !== undefined) {
            updateData.sizes = parsedSizes;
            updateData.quantity = parsedSizes.reduce((s, sz) => s + (parseInt(sz.stock) || 0), 0);
        } else if (quantity !== undefined) {
            updateData.quantity = parseInt(quantity) || 0;
        }

        const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        res.status(200).json({ product: updated, success: true, message: "Product updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found", success: false });
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};