const express = require("express");
const router = express.Router();
const { getDashboardData } = require("../../controllers/Admin/dashboardAdminController");

// Define route for dashboard statistics
router.get("/", getDashboardData);

module.exports = router;