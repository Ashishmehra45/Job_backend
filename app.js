const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const providerRoutes = require("./routes/provider");
const userRoutes = require("./routes/user");

const app = express();

const PORT = 8000;

// ================= BODY PARSER =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= CORS FIX =================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3004",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ================= ROUTES =================
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/provider", providerRoutes);
app.use("/user", userRoutes);

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ================= ERROR HANDLER =================
app.use((error, req, res, next) => {
  console.log("ERROR:", error);

  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";

  res.status(status).json({
    message,
    data: error.data || null,
  });
});

// ================= MONGODB CONNECTION =================
mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb://ashishmehra_db:RQcTw5ZNaWHnyC1h@ac-hhcovfx-shard-00-00.nbicsjk.mongodb.net:27017,ac-hhcovfx-shard-00-01.nbicsjk.mongodb.net:27017,ac-hhcovfx-shard-00-02.nbicsjk.mongodb.net:27017/job_portal?ssl=true&replicaSet=atlas-12kbym-shard-0&authSource=admin&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.log("DB Error ❌", err);
  });