const updateUserService = require("../../services/users/updateUser.service.js");

const getUpdateUserProfilePage = (req, res) => {
  const metadata = { title: "Cập nhật thông tin cá nhân" };

  res.render("user/editProfile.ejs");
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
    const { name, phone, email, password } = req.body;

    const user = await updateUserService(userId, name, phone, email, password, 'user');

    res.status(StatusCodes.OK).json(user);
    res.redirect('user/profile');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUpdateUserProfilePage,
  postUpdateUserProfile
}