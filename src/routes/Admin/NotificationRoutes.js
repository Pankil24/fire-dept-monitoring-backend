const express = require("express");
const { getAllNotifications, createNotification } = require("../../controllers/Admin/AdminNotificationController");

const router = express.Router();

router.get("/", getAllNotifications);
router.post("/", createNotification);

module.exports = router;
