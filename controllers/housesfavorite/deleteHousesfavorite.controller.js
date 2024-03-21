const deleteHousesfavoriteServices = require("../../services/housesfavorite/deleteHousesfavorite.service.js");

const deleteFavorite = async (req, res) => {
    try {
        const { houseId } = req.params.houseId;
        const { userId } = req.params.userId;
        await deleteHousesfavoriteServices(userId, houseId);
        res.send({ message: 'User unfollowed successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {deleteFavorite};