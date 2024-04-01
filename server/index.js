/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");  
// const CORS = require("cors")
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const route = require("./routes/studentRoute");

app.use(bodyParser.json());
// app.use(CORS());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DataBase connected successfully");
  })
  .catch((error) => console.log(error));
// Set headers to handle CORS

const server = http.createServer(app);


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running at port number ${PORT}`);
});

app.use("/api", route);

module.exports = {app,server};