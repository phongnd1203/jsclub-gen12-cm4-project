const UserModel = require('../../models/users/user.model.js');

const getAdminDashboardData = async () => {
    try {
        const userCount = await UserModel.countDocuments();

        const dashboardData = { userCount };
        return dashboardData;
    } catch(err) {
        console.log(err);
        throw err;
    }
};

module.exports = { getAdminDashboardData };