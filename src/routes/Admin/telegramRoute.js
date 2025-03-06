const express = require("express");
const bot = require("../../middleware/AdminMiddleware/telegrammiddleware");

const router = express.Router();

// Route to send a notification to the user
router.post("/send-notification", async (req, res) => {
    const { chatId, message } = req.body;

    if (!chatId || !message) {
        return res.status(400).json({ error: "chatId and message are required" });
    }

    try {
        await bot.sendMessage(chatId, message);
        res.status(200).json({ success: true, message: "Notification sent!" });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Failed to send message" });
    }
});

module.exports = router;
