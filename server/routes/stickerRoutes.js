const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const Sticker = require('../models/Sticker');

const upload = multer({ storage });

// @route   POST /api/stickers
// @desc    Upload a sticker
router.post('/', upload.single('sticker'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const newSticker = new Sticker({
            url: req.file.path,
            publicId: req.file.filename,
        });

        const savedSticker = await newSticker.save();
        res.json(savedSticker);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/stickers
// @desc    Get all stickers
router.get('/', async (req, res) => {
    try {
        const stickers = await Sticker.find().sort({ createdAt: -1 });
        res.json(stickers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
