const mongoose = require('mongoose');


const housesfavoriteSchema = new mongoose.Schema (
    { follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user.model',
        required: true
    },
    houses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'house.model',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const housesfavorite = mongoose.model('housesfavorite', housesfavoriteSchema);

module.exports = housesfavorite;