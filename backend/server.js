const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const quizRoutes = require("./routes/quizRoutes");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/quiz", quizRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
