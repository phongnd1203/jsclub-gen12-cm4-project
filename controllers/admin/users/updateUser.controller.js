const { StatusCodes } = require("http-status-codes");
const HttpException = require("../../utils/httpException.js");

const getUserService = require("../../../services/users/getUsers.service.js");
const updateUserService = require('../../../services/users/updateUser.service.js');

const getUpdateUserByAdmin = async (req, res, next) => {
    try {
        const { user } = req.session.user;

        return res.render("#", {
            user,
          });
        } catch (error) {
          return next(error);
        }
      };


const postUpdateUserByAdmin = async (req, res, next) => {
    try {
        const { userId } = req.session.user._id;

        const { userData } = req.body;

        const { id } = req.params;

        await updateUserService.updateUser(id, userId, userData);
        res.redirect("#");
    }   catch (err) {
        return next(err);
    }
};

const getCurrentUpdateUserPage = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const { user: currentUser } = req.session;
  
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
  };
  

const updateUserByAdminWithAuthCheck = async (req, res, next) => {
    try {
        await checkAuth("admin", true)(req, res, next);

        res.status(StatusCodes.OK).json({ message: "Chỉ admin mới có thể truy cập" });
    } catch (error) {
        next(error);
    }
};

module.exports = { getUpdateUserByAdmin,
    postUpdateUserByAdmin,
    getCurrentUpdateUserPage,
updateUserByAdminWithAuthCheck };