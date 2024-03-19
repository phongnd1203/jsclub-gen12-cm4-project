
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

const commentService = require('./comment.service');
const house = '65f883b29ad9c7d6410995f5'
const comments = commentService.getAllComment(house);
console.log(comments);