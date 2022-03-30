const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

// import routes
const authRoute = require("./routes/auth");

dotenv.config();

// connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to database.")
);

// middleware
app.use(express.json());

// route middleware
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("Server up running"));
