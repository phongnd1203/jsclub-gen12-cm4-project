const getHouseService = require("../../../services/houses/getHouses.js");
const getCommentsService = require("../../../services/houses/comments/getComments.js");

const getCommentsPage = async (req, res, next) => {
  try {
    const { houseId } = req.params;

    const { page } = req.query;

    const house = await getHouseService.getHouseById({ houseId });

    const comments = await getCommentsService.getComments({
      houseId,
      page: parseInt(page, 10),
    });

    return res.render("pages/houses/comments/list.ejs", {
      house,
      comments,
      page: parseInt(page, 10),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCommentsPage,
};
