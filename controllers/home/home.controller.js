const getHomePage = async (req, res, next) => {
  try {
    const { user } = req.session;

    return res.render("pages/home.view.ejs", {
      user,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getHomePage,
};
