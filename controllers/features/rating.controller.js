const HouseModel = require("../../models/houses/house.model");
const ratingService = require("../../services/features/rating.service");


const createRatingPage = async (req, res, next) => {
    try {
        const houseId = req.params.houseId;
        const userId = req.session.user._id;
        const rating = req.body.rating;
    
        const newRate = ratingService.addRating(houseId, userId, rating);
        res.redirect(`/house/${houseId}`);
    } catch (err) {
        return next(err);
    }
};

const deleteRatingPage = async (req, res, next) => {
    try {
        const houseId = req.params.houseId;
        const userId = req.session.user._id;    
        ratingService.deleteRating(houseId, userId);
        res.redirect(`/house/${houseId}`);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    createRatingPage,
    deleteRatingPage
};
