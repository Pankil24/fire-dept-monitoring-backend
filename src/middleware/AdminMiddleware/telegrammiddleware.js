const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

// Initialize Telegram Bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

console.log("Telegram Bot is running...");

// Capture user chat IDs when they start the bot
bot.on("message", (msg) => {
    console.log(`User Chat ID: ${msg.chat.id}`);
    bot.sendMessage(msg.chat.id, "Hello! I will notify you about your NOC updates.");
});

module.exports = bot;
