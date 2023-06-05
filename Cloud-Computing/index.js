// index.js
const express = require('express');
const connectDB = require('./database/db');
const userRoutes = require('./routes/user');
const predictRoutes = require('./routes/predict');
const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());


// Routes
app.use('/api/user', userRoutes);
app.use('/api/predict', predictRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

