/* eslint-disable no-undef */
const express = require("express");
const {
  create,
  getAll,
  deleteStudentByID,
  update,
  getOne,
} = require("../controllers/student");

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getOne/:id", getOne);
route.delete("/delete/:id", deleteStudentByID);
route.put("/update/:id", update);
module.exports = route;
