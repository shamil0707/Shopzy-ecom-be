const express = require('express');
const router = express.Router();
const Category = require ('../models/categoryModel');
const { Protect,restrictTo } = require('../middleware/authMiddleware');


// Create a new category
router.post('/categories',Protect, restrictTo(['admin']), async (req, res) => {
    const { name,thumbnail } = req.body;
    try {
        const category = new Category({ name,thumbnail });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;