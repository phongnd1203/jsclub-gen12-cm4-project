const express = require('express');
const ratingRouter = express.Router();
const UserModel = require('../../../models/users/user.model');
const ratingService = require('../../../services/features/rating.service');

ratingRouter.post('/rate/create', ratingService.addRating);

ratingRouter.post('/rate/update', ratingService.updateRating);

ratingRouter.post('/rate/delete', ratingService.deleteRating);

module.exports = ratingRouter;