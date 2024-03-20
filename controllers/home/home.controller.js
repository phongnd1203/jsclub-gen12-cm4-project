const getHomePage = async (req, res, next) => {
  try {
    const metadata = {
      title: "Trang chủ",
    };

    return res.render("home", { metadata });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getHomePage,
};
