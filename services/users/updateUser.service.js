const UserModel = require("../../models/users/user.model.js");

const updateUser = async (id, name, phone, email, password, role) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        email,
        password,
        role,
      },
      { new: true },
    );
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { updateUser };
