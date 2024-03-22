const updateUserService = require("../../services/users/updateUser.js");
const argon2 = require("argon2");

const getUpdateUserProfilePage = (req, res) => {
  const metadata = { title: "Cập nhật thông tin cá nhân" };

  res.render("pages/user/edit.ejs", { metadata });
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

    const user = await updateUserService.updateUser(userId,
      name, phone, email, password
    );
    res.redirect('/user/profile');
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUpdateUserProfilePage,
  postUpdateUserProfile,
};
