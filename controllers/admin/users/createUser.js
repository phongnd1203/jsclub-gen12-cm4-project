const createUserService = require("../../../services/users/createUser.js");

const getCreateUserPage = (req, res) => {
  res.render("pages/admin/users/create.ejs");
};

const postCreateUser = async (req, res, next) => {
  try {
    const newUser = await createUserService.createUser(req.body);

    return res.redirect(`/admin/users/${newUser.id}`);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCreateUserPage, postCreateUser };
