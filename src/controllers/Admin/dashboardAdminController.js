
const jwt = require("jsonwebtoken");
const { USER_NOT_FOUND } = require("../../helpers/error.js");
require("dotenv").config(); 
const NocForm  = require("../../models/EndUser/NocForm.js");
const User = require("../../models/EndUser/User.js");


const getDashboardData = async (req, res) => {
    try {
      const totalUsers = await User.count(); // Count total users
      const totalNOCRequests = await NocForm.count(); // Count total NOC applications
      const totalNOCSubmissions = await NocForm.count({ where: { status: "approved" } }); // Count submitted NOC forms
      const pendingNOCSubmissions = await NocForm.count({ where: { status: "pending" } });
      const rejectedNOCSubmissions = await NocForm.count({ where: { status: "rejected" } });
      res.status(200).json({
        totalUsers,
        totalNOCRequests,
        totalNOCSubmissions,
        pendingNOCSubmissions,
        rejectedNOCSubmissions,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  module.exports = { getDashboardData };