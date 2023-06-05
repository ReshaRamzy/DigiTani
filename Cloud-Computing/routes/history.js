const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const History = require('../database/models/History');

// Get history endpoint
router.get('/history', auth, async (req, res) => {
  try {
    // Fetch the history for the authenticated user from the database
    const history = await History.find({ userId: req.user.userId });

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Post detection endpoint
router.post('/detection', auth, async (req, res) => {
  try {
    // Get the detection data from the request body
    const { id_disease, name, description, recommended_action } = req.body;

    // Create a new detection record
    const newDetection = new History({
      userId: req.user.userId,
      id_disease,
      name,
      description,
      recommended_action,
    });

    // Save the detection record to the database
    await newDetection.save();

    res.json({ message: 'Detection posted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
