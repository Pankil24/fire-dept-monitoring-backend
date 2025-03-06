const TelegramBot = require("node-telegram-bot-api");

// Replace with your bot token
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Handle messages
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Hello ${msg.from.first_name}, pankil how can I assist you with NOC Submission?`);
});

console.log("Bot is running...");
