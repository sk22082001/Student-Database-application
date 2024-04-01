/* eslint-disable no-undef */

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  _id: {
    type: String,
  },
  course: {
    type: String,
  },
  fees: {
    type: Number,
    min: 0,
  },
  courseStart: {
    type: Date,
  },
  courseEnd: {
    type: Date,
    validate: {
      validator: function (value) {
        // Custom validation to ensure courseEnd is after courseStart
        return this.courseStart < value;
      },
      message: "Course end date must be after course start date",
    },
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
