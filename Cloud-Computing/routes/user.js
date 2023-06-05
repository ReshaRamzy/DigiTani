// routes/user.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/User');
const Disease = require('../database/models/Disease');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/user', authenticateJWT, async (req, res) => {
  try {
    // Fetch the user from the database based on the authenticated user ID
    const user = await User.findById(req.user.userId, { password: 0 }); // Exclude password from the response

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/history', authenticateJWT, async (req, res) => {
  try {
    // Fetch the user's history from the database based on the authenticated user ID
    const user = await User.findById(req.user.userId);
    const history = user.history;

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/detection', authenticateJWT, async (req, res) => {
  try {
    const { id_disease, name, description, recommended_action } = req.body;

    // Create a new disease detection
    const newDetection = new Disease({
      id_disease,
      name,
      description,
      recommended_action,
    });

    // Save the detection to the user's history
    const user = await User.findById(req.user.userId);
    user.history.push(newDetection);
    await user.save();

    res.json({ message: 'Detection saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
