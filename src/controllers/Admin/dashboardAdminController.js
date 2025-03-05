const { Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");
const { USER_NOT_FOUND } = require("../../helpers/error.js");
require("dotenv").config(); 
const NocForm  = require("../../models/EndUser/NocForm.js");
const User = require("../../models/EndUser/User.js");


const getDashboardData = async (req, res) => {
  try {
    
    const totalUsers = await User.count();
    const totalNOCRequests = await NocForm.count();
    const approvedNOCSubmissions = await NocForm.count({ where: { status: "approved" } });
    const pendingNOCSubmissions = await NocForm.count({ where: { status: "pending" } });
    const rejectedNOCSubmissions = await NocForm.count({ where: { status: "rejected" } });


    const monthlySubmissionsData = await NocForm.findAll({
      attributes: [
        [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%b"), "month"],
        [Sequelize.fn("COUNT", "*"), "submissions"]
      ],
      group: ["month"],
      raw: true
    });
    const monthlySubmissions = monthlySubmissionsData.map(item => ({
      month: item.month,
      submissions: parseInt(item.submissions)
    }));

    const pendingTrendData = await NocForm.findAll({
      attributes: [
        [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m"), "date"],
        [Sequelize.fn("COUNT", "*"), "pending"]
      ],
      where: { status: "pending" },
      group: ["date"],
      raw: true
    });

    const pendingTrend = pendingTrendData.map(item => ({
      date: item.date,
      pending: parseInt(item.pending)
    }));

    const approvalBreakdown = [
      { name: "Approved", value: approvedNOCSubmissions },
      { name: "Pending", value: pendingNOCSubmissions },
      { name: "Rejected", value: rejectedNOCSubmissions }
    ];

    res.status(200).json({
      totalUsers,
      totalNOCRequests,
      monthlySubmissions,
      pendingTrend,
      approvalBreakdown
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
  
  module.exports = { getDashboardData };