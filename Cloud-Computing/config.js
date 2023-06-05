// config.js
module.exports = {
    PORT: process.env.PORT || 3000, // Port number for the server
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://rahayurdn:digitani123@digitani.bexnk7d.mongodb.net/?retryWrites=true&w=majority', // MongoDB connection URI
    JWT_SECRET: process.env.JWT_SECRET || 'nyangkultani', // Secret key for JWT authentication
  };
  