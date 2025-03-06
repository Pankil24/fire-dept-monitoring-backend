const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("Admin", "Inspector", "Fire Officer", "Business Owner"),
    allowNull: false,
  },
  phoneNo: {
    type: DataTypes.STRING, // Changed from INTEGER to STRING (phone numbers may start with 0)
    allowNull: false, 
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  telegramChatId: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null initially (users might not have interacted with the bot)
    unique: true,
  }
});

module.exports = User;
