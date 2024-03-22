const deleteUserService = require("../../../services/users/deleteUser.js");

const postDeleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    await deleteUserService.deleteUserById(userId);

    return res.redirect("/admin/users");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  postDeleteUser,
};
