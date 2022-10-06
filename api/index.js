const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const connectionRoute = require("./routes/connection");

dotenv.config();

// middlewares
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes
app.use("/api", userRoute);
app.use("/api", connectionRoute);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});
