const mongoose = require('mongoose');

const stickerSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
        required: true,
    },
    uploader: {
        type: String, // Could be IP or User ID if auth existed
        default: 'Anonymous',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Sticker', stickerSchema);
