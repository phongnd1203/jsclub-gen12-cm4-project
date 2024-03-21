const getHomePage = async (req, res, next) => {
  try {
    const metadata = {
      title: "Trang chủ",
    };

    return res.render("home", { metadata });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getHomePage,
};
