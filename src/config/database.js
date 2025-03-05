require('dotenv').config(); // Load environment variables

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false 
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully'))
  .catch(err => console.error('❌ Database connection failed:', err));
  sequelize.sync({ force: false }) 
    .then(() => console.log("Tables synchronized"))
    .catch(err => console.log("Sync error: " + err));

module.exports = sequelize;
