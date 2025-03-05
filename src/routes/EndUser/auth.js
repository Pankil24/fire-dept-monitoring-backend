const express = require("express");
const router = express.Router();
const {
  userRegistration,
  userLogin,
  changeUserPassword,
  getAllUsers ,
  sendPasswordResetEmail,
  resetUserPassword,
} = require("../../controllers/EndUser/authController.js");
const checkUserAuth = require("../../middleware/EndUserMiddleware/authmiddleware.js");

// Public Routes
router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/send-reset-password-email", sendPasswordResetEmail);
router.post("/reset-password/:id/:token", resetUserPassword);

// Protected Routes (Require Authentication)
router.post("/change-password", checkUserAuth, changeUserPassword);
router.get("/users", getAllUsers );

module.exports = router;
