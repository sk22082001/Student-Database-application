/* eslint-disable no-undef */
const Student = require("../models/students");

const create = async (req, res) => {
  try {
    const studentData = new Student(req.body);

    // Check for blank entries
    if (
      !studentData.fname.trim() ||
      !studentData.lname.trim() ||
      !studentData._id.trim() ||
      !studentData.course ||
      !studentData.fees ||
      !studentData.courseStart ||
      !studentData.courseEnd
    ) {
      return res.status(400).json({ msg: "Blank entry Error" });
    }

    await studentData.save();
    res.status(200).json({ msg: "Student created successfully" });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      // Duplicate key error
      res
        .status(400)
        .json({ msg: `Student with ID ${error.keyValue._id} already exists` });
    } else {
      // Other errors
      res.status(500).json({ error: error.message });
    }
  }
};

const getAll = async (req, res) => {
  try {
    const studentData = await Student.find();
    if (!studentData) {
      return res.status(404).json({ msg: "Student data not found" });
    }
    res.status(200).json(studentData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
const deleteStudentByID = async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);

    if (result) {
      return res.json({ status: "success" });
    } else {
      return res.status(404).json({ status: "not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const studentExist = await Student.findById(id);
    if (!studentExist) {
      return res.status(404).json({ msg: "Student not found" });
    }
    res.status(200).json(studentExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const studentExist = await Student.findById(id);
    if (!studentExist) {
      return res.status(404).json({ msg: "Student not found" });
    }
    const updatedData = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  create,
  getAll,
  deleteStudentByID,
  update,
  getOne,
};
