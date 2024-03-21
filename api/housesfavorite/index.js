const express = require('express');

const statusHousesfavoriteController = require("../../controllers/housesfavorite/statusHousesfavorite.controller.js");
const getHousesfavoriteController = require("../../controllers/housesfavorite/getHousesfavorite.controller.js");
const deleteHousesfavoriteController = require("../../controllers/housesfavorite/deleteHousesfavorite.controller.js");
const listHousesfavoriteController = require("../../controllers/housesfavorite/listHousesfavorite.controller.js");
const housesfavoriteRouter = express.Router();
const bodyParser = require('body-parser');


housesfavoriteRouter.use(bodyParser.json());

housesfavoriteRouter.get("/follow/status/:followerId/:housesId", statusHousesfavoriteController.statusFavorite);

housesfavoriteRouter.post("/follow/:followerId/:housesId", getHousesfavoriteController.getFavorite);

housesfavoriteRouter.delete("/follow/:followerId/:housesId", deleteHousesfavoriteController.deleteFavorite);

housesfavoriteRouter.get("/follow/:followerId/following", listHousesfavoriteController.listFavorite);


module.exports = housesfavoriteRouter;


