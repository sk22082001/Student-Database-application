import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./add.css";
import toast from "react-hot-toast";

const Add = () => {
  const students = {
    fname: "",
    lname: "",
    _id: "",
    course: "",
    fees: "",
    courseStart: "",
    courseEnd: "",
  };

  const [student, setStudent] = useState(students);
  const [errors, setErrors] = useState({});
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const checkIfIdExists = async (_id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getOne/${_id}`
      );
      return response && response.status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!student.fname.trim()) {
      formIsValid = false;
      newErrors.fname = "First name is required";
    }
    if (!student.lname.trim()) {
      formIsValid = false;
      newErrors.lname = "Last name is required";
    }

    if (!student.fees.trim()) {
      formIsValid = false;
      newErrors.fees = "Fees is required";
    }
    if (!student._id.trim()) {
      formIsValid = false;
      newErrors._id = "ID is required";
    }
    if (!student.course) {
      formIsValid = false;
      newErrors.course = "Please select any course";
    }
    if (!student.courseStart) {
      formIsValid = false;
      newErrors.courseStart = "Select any date";
    }
    if (!student.courseEnd) {
      formIsValid = false;
      newErrors.courseEnd = "Select any date";
    }
    setErrors(newErrors);
    if (!formIsValid) {
      setFormErrorMessage("All fields are required.");
    } else {
      setFormErrorMessage("");
    }

    return formIsValid;
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const idExists = await checkIfIdExists(student._id);
        if (idExists) {
          setFormErrorMessage(
            "ID already exists. Please choose a different ID"
          );
        } else {
          const response = await axios.post(
            "http://localhost:8000/api/create",
            student
          );
          if (response && response.data) {
            toast.success(response.data.msg, { position: "top-right" });
          } else {
            toast.error("Error adding student. Please try again.", {
              position: "top-right",
            });
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Please Enter valid Entry", { position: "top-right" });
      }
    }
  };

  return (
    <div className="addstudent">
      <h3>Student Enrollment Form</h3>
      {formErrorMessage && <div className="error">{formErrorMessage}</div>}

      <form
        className="addstudentForm"
        id="add-student-form"
        onSubmit={submitForm}
      >
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First name"
          />
        </div>
        {errors.fname && <div className="error">{errors.fname}</div>}

        <div className="inputGroup">
          <label htmlFor="lname">Last name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last name"
          />
        </div>
        {errors.lname && <div className="error">{errors.lname}</div>}

        <div className="inputGroup">
          <label>
            Course:
            <br />
            <select name="course" onChange={inputHandler} className="dropdown">
              <option value="" selected disabled hidden>
                Choose here
              </option>
              <option value="React JS">React JS</option>
              <option value="Node JS">Node JS</option>
              <option value="Mongo DB">Mongo DB</option>
              <option value="PostgreSQL">PostgreSQL</option>
              <option value="MySQL">MySQL</option>
              <option value="SQLite">SQLite</option>
            </select>
          </label>
        </div>
        {errors.course && <div className="error">{errors.course}</div>}

        <div className="inputGroup">
          <label htmlFor="_id">Student ID</label>
          <input
            type="_id"
            onChange={inputHandler}
            id="_id"
            name="_id"
            autoComplete="off"
            placeholder="Student ID"
          />
        </div>
        {errors._id && <div className="error">{errors._id}</div>}

        <div className="inputGroup">
          <label htmlFor="fees">Fees</label>
          <input
            type="fees"
            onChange={inputHandler}
            id="fees"
            name="fees"
            autoComplete="off"
            placeholder="Fees"
          />
        </div>
        {errors.fees && <div className="error">{errors.fees}</div>}

        <div className="inputGroup">
          <label htmlFor="courseStart">Course Start</label>
          <input
            type="date"
            onChange={inputHandler}
            id="courseStart"
            name="courseStart"
            autoComplete="off"
            placeholder="courseStart"
          />
        </div>
        {errors.courseStart && (
          <div className="error">{errors.courseStart}</div>
        )}

        <div className="inputGroup">
          <label htmlFor="courseEnd">Course End</label>
          <input
            type="date"
            onChange={inputHandler}
            id="courseEnd"
            name="courseEnd"
            autoComplete="off"
            placeholder="courseEnd"
          />
        </div>
        {errors.courseEnd && <div className="error">{errors.courseEnd}</div>}

        <div className="inputGroup">
          <button type="submit">ADD STUDENT</button>
        </div>
        <br />
        <Link className="button" id="btn" to={"/add"}>
          Student List
        </Link>
      </form>
    </div>
  );
};

export default Add;
