const express = require("express");
require("dotenv").config();
console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
const path = require("path");

const sequelize = require("./config/database");
const authRoutes = require("./routes/EndUser/auth.js");
const adminRoutes = require("./routes/Admin/adminroute.js");
const nocRoutes = require("./routes/EndUser/NocRoutes.js");
const nocAdminRoute = require("./routes/Admin/NocAdminRoutes.js");
const dashboardRoutes = require("./routes/Admin/admindashboardroute.js");
const userRoutes = require("./routes/EndUser/auth.js");
const notificationRoutes = require("./routes/Admin/NotificationRoutes.js");

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
app.use("/api/dashboard", dashboardRoutes);
app.use("/notifications", notificationRoutes);
app.use("/api", userRoutes);  



// Sync Database
sequelize.sync({ force: false })
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ Error syncing database:", err));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
