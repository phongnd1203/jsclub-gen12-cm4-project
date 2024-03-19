const mongoose = require('mongoose');
const HouseModel = require('../houses/house.model');

const commentSchema = mongoose.Schema({
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House',
        require: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    comment: {
        type: String,
        require: true
    }  
}, 
{
    timestamps: true,
});

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;