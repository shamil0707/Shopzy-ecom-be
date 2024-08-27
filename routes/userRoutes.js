const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { verifyLogin } = require('../controllers/authController');
const { verifyToken, Protect } = require('../middleware/authMiddleware');
const saltRounds = 10;

// Create a new user
router.post('/users/signup', async (req, res) => {
    
    try {
        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        const user = new User({
            ...req.body,
            role: 'user',
            password: hash
        });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single user by ID
router.get('/users/currentUser',Protect, async (req, res,next) => {
    try {
        console.log
        const user = await User.findById(req.user._id);
        const payload = user.toObject? user.toObject():user
      
        delete payload.password
        res.status(200).json(payload)
           
        }
      catch (error) {
        res.status(404).send("user not found")
      }
});

module.exports = router;
