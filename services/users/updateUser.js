const UserModel = require("../../models/users/user.js");

const updateUser = async (id, name, phone, email, password) => {
  try {
    
    const hashedPassword = await argon2.hash(password);
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        email,
        password,
      },
      { new: true },
    );
    console.log(user);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { updateUser };
