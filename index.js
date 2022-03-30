const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

// import routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

// connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to database.")
);

// middleware
app.use(express.json());

// route middleware
app.use("/api/user", authRoute);
app.use("/api/post", postRoute);

app.listen(3000, () => console.log("Server up running"));
