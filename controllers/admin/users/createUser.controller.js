const { StatusCodes } = require("http-status-codes");

const createUserService = require('../../../services/admins/createUser.service.js');
const checkAuth = require('../../../middlewares/checkAuth.middleware.js');

const createUserByAdmin = async (req, res) => {
    try {
        const userData = req.body; 
        const adminId = req.user.id;

        const newUser = await createUserService.createUserByAdmin(userData, adminId);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUserByAdminWithAuthCheck = async (req, res, next) => {
    try {
        await checkAuth("admin", true)(req, res, next);

        res.status(StatusCodes.OK).json({ message: "Chỉ admin mới có thể truy cập" });
    } catch (error) {
        next(error);
    }
};

module.exports = {createUserByAdmin,
    createUserByAdminWithAuthCheck
};