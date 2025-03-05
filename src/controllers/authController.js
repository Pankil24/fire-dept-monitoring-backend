const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { USER_NOT_FOUND } = require("../helpers/error.js");

// Register User
const userRegistration = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) 
      return res.status(400).json({ msg: "All fields are required" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role });

    res.status(201).json({ msg: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ status: "failed", message: "All fields are required" });
        }

        // Find user by email in Sequelize
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ status: "failed", message: "You are not a registered user" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "failed", message: "Email or password is not valid" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userID: user.id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
        );

        res.status(200).json({
            status: "success",
            message: "Login successfully",
            token,
            user: { id: user.id, email: user.email, role: user.role },
        });
    } catch (error) {
        next(error);
        res.status(500).json({ status: "failed", message: "Unable to login" });
    }
};
// Get Authenticated User
// const getLoggedUser = async (req, res) => {
//     try {
//         const user = await User.findByPk(req.user.id);
//         console.log(" i am here", req.user , user)
  
//       if (!user) return res.status(404).json({ msg: "User not found" });
  
//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

// Change User Password
const changeUserPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update({ password: hashedPassword }, { where: { id: req.user.id } });

    res.json({ msg: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send Reset Password Email (Dummy Response for Now)
const sendPasswordResetEmail = async (req, res) => {
  res.json({ msg: "Password reset email sent (dummy response)" });
};

// Reset User Password (Dummy Implementation)
const resetUserPassword = async (req, res) => {
  res.json({ msg: "Password has been reset successfully (dummy response)" });
};

module.exports = {
  userRegistration,
  userLogin,
  changeUserPassword,
//   getLoggedUser,
  sendPasswordResetEmail,
  resetUserPassword,
};
