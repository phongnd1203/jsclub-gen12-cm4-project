const UserModel = require('../../models/users/user.model.js');

class UserService {
    async createUserByAdmin(userData, adminId) {
        try {
            const newUser = new UserModel(userData);

            newUser.createdBy = adminId;

            const savedUser = await newUser.save();

            return savedUser;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();