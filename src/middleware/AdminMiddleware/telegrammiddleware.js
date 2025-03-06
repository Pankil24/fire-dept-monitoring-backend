const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true })

console.log('Telegram Bot is running...')

// Replace this with the actual chat ID of the user
const chatId = '6596332485' // <-- Replace this with the real chat ID

// Function to send a message anytime
function sendMessage(message) {
  bot
    .sendMessage(chatId, message)
    .then(() => console.log('Message sent successfully!'))
    .catch((err) => console.error('Error sending message:', err))
}

// Example: Send a message after 10 seconds
// setTimeout(() => {
//   sendMessage('🚀 Your NOC has been updated! Check it now.')
// }, 10000)

// Export the function for external use
module.exports = { bot, sendMessage }
