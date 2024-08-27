const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const upload = require('../middleware/multerMiddleware');
const {uploadImageOnCloudinary} = require ('../utilis/cloudinary');
const { Protect,restrictTo } = require('../middleware/authMiddleware');




// Create a new product
router.post('/products',Protect, restrictTo(['admin']), upload.single("picture"), async (req, res) => {
    const { name, price, description, categoryId } = req.body;
    const picturePath = req.file?.path;

    // console.log("Request Body:", req.body); // Log the body data
    // console.log("File Info:", req.file); // Log the file data

    try {
        // Validate that the category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Upload image to Cloudinary
        const { secure_url, public_id } = await uploadImageOnCloudinary(picturePath, "products");
        if (!secure_url) {
            return res.status(400).send({
                success: false,
                message: "Error while uploading image",
            });
        }

        // Create and save the product
        const product = new Product({
            name,
            price,
            description,
            category: categoryId,
            picture: { secure_url, public_id },
        });

        await product.save();
        console.log("New Product:", product); // Log the product data

        // Respond with success
        return res.status(201).json({
            success: true,
            message: "Product uploaded successfully",
            product,
        });
    } catch (error) {
        console.error("Error while adding product:", error); // Log the error
        return res.status(400).send({ message: error.message });
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