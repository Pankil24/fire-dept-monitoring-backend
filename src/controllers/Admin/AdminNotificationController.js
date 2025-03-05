const Notification = require("../../models/Admin/Notification");

// GET all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({ order: [["time", "DESC"]] });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// POST - Create a new notification
const createNotification = async (req, res) => {
  try {
    const { title, description, path, isRead } = req.body;

    const newNotification = await Notification.create({
      title,
      description,
      time: new Date(),
      path,
      isRead: isRead || false,
    });

    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: "Failed to create notification" });
  }
};

module.exports = {
  getAllNotifications,
  createNotification,
};

