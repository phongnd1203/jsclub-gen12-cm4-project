const mongoose = require('mongoose');

const HousesfavoriteSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user.model',
        required: true
    },
    favorite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'house.model',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Housesfavorite = mongoose.model('Housesfavorite', HousesfavoriteSchema);

module.exports = Housesfavorite;