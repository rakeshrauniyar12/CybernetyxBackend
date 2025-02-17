const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoutes.js");
const carProductRoute = require("./routes/cartProductRoutes.js");
const productRoute = require("./routes/productRoutes.js");
const categoryRoute = require("./routes/categoryRoutes.js");
const addressRoute = require("./routes/addressRoutes.js");
const orderRoute = require("./routes/orderRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000"],
  method: "GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Root endpoint
app.use("/api/auth", userRoute);
app.use("/api/cartproduct", carProductRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/address", addressRoute);
app.use("/api/order", orderRoute);
app.get("/", (req, res) => {
  res.send("Welcome to the authentication API");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
