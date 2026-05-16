const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

// Initialize the Express application
const app = express();

// --- Middleware ---
// Enable CORS for cross-origin requests (allows frontend to talk to backend)
app.use(cors());
// Allow the server to parse incoming JSON data from requests
app.use(express.json());

// --- Routes ---
// Any request to /api/auth will be handled by authRoutes
app.use('/api/auth', authRoutes);

// Any request to /api/weather will be handled by weatherRoutes
app.use('/api/weather', weatherRoutes);

// A simple home route to verify the server is working
app.get('/', (req, res) => {
    res.send('AGRO-TECH Backend is running... 🚀');
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
