
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// Auth registration in server
const authRoutes = require("./modules/auth/auth.routes");
app.use("/api/auth", authRoutes);

const awsRoutes = require("./modules/aws/aws.routes");
app.use("/api/aws", awsRoutes);

const billingRoutes = require("./modules/billing/billing.routes");
app.use("/api/billing", billingRoutes);

const loadSeededBillingData = require("./modules/billing/seededBilling.loader");

// Call once during startup (comment after first run)
// loadSeededBillingData();

const recommendationRoutes = require("./modules/recommendations/recommendation.routes");
app.use("/api/recommendations", recommendationRoutes);

const alertRoutes = require("./modules/alerts/alert.routes");
app.use("/api/alerts", alertRoutes);

const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
app.use("/api/dashboard", dashboardRoutes);

const usersRoutes = require("./modules/users/users.routes");
app.use("/api/users", usersRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("CloudOptima backend running");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});