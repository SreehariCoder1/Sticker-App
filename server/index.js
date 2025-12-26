const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const stickerRoutes = require('./routes/stickerRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for simplicity (or configure specific domains)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Database Connection
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState;
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
};

// Route Middleware
app.use('/api/stickers', async (req, res, next) => {
    await connectDB();
    next();
}, stickerRoutes);

// Health Check
app.get('/api', (req, res) => {
    res.send('MERN Sticker App API is running');
});

const PORT = process.env.PORT || 5000;

// Only listen if not running in Vercel (Vercel exports the app)
if (process.env.NODE_ENV !== 'production') {
    connectDB().then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    });
}

module.exports = app;
