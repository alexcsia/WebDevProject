const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleLogin = async (user, password) => {
  try {
    const foundUser = await User.findOne({ username: user });
    if (!foundUser) {
      return { success: false, message: "Invalid login credentials" };
    }

    const correctPassword = await bcrypt.compare(password, foundUser.password);
    if (!correctPassword) {
      return { success: false, message: "Invalid login credentials" };
    }

    //return object containing user
    return { success: true, user: foundUser };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
};

const registerUser = async (
  first_name,
  last_name,
  username,
  email,
  phone_number,
  password
) => {
  try {
    // create a new user
    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      username: username,
      password: password,
    });

    console.log("A new user has been created:", newUser);

    return { success: true, message: "User created successfully!" };
  } catch (error) {
    return {
      success: false,
      message: "Error creating user: Username/Email already exists!",
    };
  }
};

const deleteUser = async (user) => {
  const delUser = await User.deleteOne({ _id: user._id });
  if (delUser.deletedCount === 1) {
    console.log("User deleted successfully");
  } else {
    console.log("User not deleted");
  }
};

const editProfile = async (
  first_name,
  last_name,
  username,
  email,
  phone_number,
  hashedPassword,
  user
) => {
  try {
    const updatedInfo = {
      $set: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
        username: username,
        password: hashedPassword ? hashedPassword : undefined,
      },
    };
    const updateUser = await User.updateOne({ _id: user._id }, updatedInfo);
    const newUser = await User.findById(user._id);
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleLogin, registerUser, deleteUser, editProfile };
