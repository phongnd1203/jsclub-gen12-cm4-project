const updateUserService = require("../../services/users/updateUser.js");

const getUpdateUserProfilePage = (req, res) => {
  const metadata = { title: "Cập nhật thông tin cá nhân" };

  res.render("pages/user/update-profile", { metadata });
};

const postUpdateUserProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(
        StatusCodes.UNPROCESSABLE_ENTITY,
        "Thông tin đầu vào không hợp lệ",
        { errors: errors.array() },
      );
    }

    const { userId } = req.session;
    const {} = req.body;

    const user = await updateUserService(id);

    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getUpdateUserProfilePage,
  postUpdateUserProfile,
};
