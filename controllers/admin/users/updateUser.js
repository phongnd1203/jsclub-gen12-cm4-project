const updateUserService = require("../../../services/admin/users/updateUser.js");

const getUpdateUserPage = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await updateUserService.getUserById(userId);

    metadata = {
      title: "Update User",
    };

    return res.render("pages/admin/users/ed.ejs", {
      metadata,
      user,
    });
  } catch (error) {
    return next(error);
  }
};

const postUpdateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    await updateUserService.updateUserById(userId, req.body);

    return res.redirect(`/admin/users/${userId}`);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getUpdateUserPage, postUpdateUser };
