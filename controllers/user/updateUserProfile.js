const updateUserService = require("../../services/users/updateUser.js");
const argon2 = require("argon2");

const getUpdateUserProfilePage = (req, res) => {
  const metadata = { title: "Cập nhật thông tin cá nhân" };

  res.render("pages/user/edit.ejs", { metadata });
};

const postUpdateUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { name, phone, email, password } = req.body;

    const user = await updateUserService.updateUser(userId, {
      name,
      phone,
      email,
      password,
    });
    res.redirect("/user/profile");
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUpdateUserProfilePage,
  postUpdateUserProfile,
};
