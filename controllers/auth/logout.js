const { StatusCodes } = require("http-status-codes");

const HttpException = require("../../utils/httpException.js");

const postLogout = (req, res) => {
  try {
    req.session.destroy();
    return res.redirect("/");
  } catch (err) {
    throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  postLogout,
};
