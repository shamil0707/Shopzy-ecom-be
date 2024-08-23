const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

// Create a new product
router.post('/products', async (req, res) => {
    const { name, price,image,description, categoryId } = req.body;
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const product = new Product({ name, price, image, description, category: categoryId });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get products by category
router.get('/products/category/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    try {
        const products = await Product.find({ category: categoryId }).populate('category');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/products/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


module.exports = router;