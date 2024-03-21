const { StatusCodes } = require("http-status-codes");
const HttpException = require("../../utils/httpException.js");

const getUserService = require("../../services/users/getUsers.service.js");
const deleteUserService = require ('../../../services/users/deleteUser.service.js');
const checkAuth = require('../../../middlewares/checkAuth.middleware.js');

const getDeleteUserByAdmin = async (req, res, next) => {
    try {
        const { user } = req.session.user;

        return res.render("#", { user });
    } catch (err) {
        console.log(err);
        return next(err)
    }
};

const postDeleteUserByAdmin = async (req, res, next) => {
try {
    const { user } = req.session.user;
    const { userId } = req.params.user._id;

    await deleteUserService.deleteUser(user, userId);
    req.session.destroy();
    res.status(StatusCodes.NO_CONTENT).send();

    res.redirect("/");
}   catch (err) {
    return next(err);
}
};

const getDeleteCurrentUserPageByAdmin = async (req, res, next) => {
    try{
        const { id } = req.params.user._id;
        const { user: currentUser } = req.session.user;

    if (currentUser.id === id) {
        return res.redirect("#");
      }
  
    if (userRoles[currentUser.role] > userRoles.admin) {
        throw new HttpException(
          StatusCodes.FORBIDDEN,
          "Không có quyền truy cập trang này",
        );
    }

    const user = await getUserService.getUser(id);

    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }

    return res.render("#", {
      user,
    });
  } catch (error) {
    return next(error);
      }
}


const deleteUserByAdminWithAuthCheck = async (req, res, next) => {
    try {
        await checkAuth("admin", true)(req, res, next);

        res.status(StatusCodes.OK).json({ message: "Chỉ admin mới có thể truy cập" });
    } catch (error) {
        next(error);
    }
};

module.exports = { getDeleteUserByAdmin, 
    postDeleteUserByAdmin,
    getDeleteCurrentUserPageByAdmin,
    deleteUserByAdminWithAuthCheck};