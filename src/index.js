const express = require("express");
require("dotenv").config();
console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

const sequelize = require("./config/database");
const authRoutes = require("./routes/EndUser/auth.js");
const adminRoutes = require("./routes/Admin/adminroute.js");


const app = express();
app.use(cors())
app.use(express.json());


// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);


// Sync Database
sequelize.sync({ force: false })
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ Error syncing database:", err));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
