const express = require("express");
require("dotenv").config();
console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
const path = require("path");

const sequelize = require("./src/config/database.js");
const authRoutes = require("./src/routes/EndUser/auth.js");
const adminRoutes = require("./src/routes/Admin/adminroute.js");
const nocRoutes = require("./src/routes/EndUser/NocRoutes.js");
const nocAdminRoute = require("./src/routes/Admin/NocAdminRoutes.js");
const dashboardRoutes = require("./src/routes/Admin/admindashboardroute.js");
const userRoutes = require("./src/routes/EndUser/auth.js");
const notificationRoutes = require("./src/routes/Admin/NotificationRoutes.js");
const telegramRoutes = require("./src/routes/Admin/telegramRoute.js");


const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/noc", nocRoutes);
app.use("/api", nocAdminRoute)
app.use("/api", dashboardRoutes);
app.use("/notifications", notificationRoutes);
app.use("/api", userRoutes);  

app.use("/api/telegram", telegramRoutes);

// Sync Database
sequelize.sync({ force: false })
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ Error syncing database:", err));

app.listen(5002, () => console.log("🚀 Server running on port 5002"));
