import Product from "../Models/Product.js";





// get all products 
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products, success: true, message: " all products" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "products not found", success: false });
    }
};

//  get procudt by id 
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
        res.status(200).json({ product, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "product not found with this id", success: false });
    }
};



//  add product 
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, quantity } = req.body;
        const product = new Product({ name, description, price, image, category, quantity });
        await product.save();
        res.status(201).json({ message: "Product added successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "error in adding product" });
    }
};


//  update product 
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ product: updatedProduct, success: true, message: "Product updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "error in updating product" });
    }
};

// detete product   
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "error in deleting product" });
    }
};