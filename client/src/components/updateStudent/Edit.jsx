
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../addStudent/add.css";
import toast from "react-hot-toast";

const Edit = () => {
  const students = {
    fname: "",
    lname: "",
    _id: "",
    course: "",
    fees: "",
    courseStart: "",
    courseEnd: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(students);
  const [errors, setErrors] = useState({});
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setStudent({ ...student, [name]: value });
    setFormErrorMessage("");
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

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Exclude ID from the update request
        const updatedStudent = { ...student };

        // Optionally, you can delete _id from updatedStudent if it's present
        delete updatedStudent._id;

        await axios.put(
          `http://localhost:8000/api/update/${id}`,
          updatedStudent
        );

        toast.success("Student updated successfully", {
          position: "top-right",
        });
        navigate("/add");
      } catch (error) {
        console.error(error);
        toast.error("Error updating student. Please try again.", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="addstudent">
      <h3>Update student</h3>
      {formErrorMessage && <div className="error">{formErrorMessage}</div>}
      <form className="addstudentForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            value={student.fname}
            onChange={inputChangeHandler}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First name"
          />
          {errors.fname && <div className="error">{errors.fname}</div>}
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last name</label>
          <input
            type="text"
            onChange={inputChangeHandler}
            id="lname"
            name="lname"
            value={student.lname}
            autoComplete="off"
            placeholder="Last name"
          />
        </div>
        {errors.lname && <div className="error">{errors.lname}</div>}

        <div className="inputGroup">
          <label>
            Course:
            <br />
            <select
              name="course"
              onChange={inputChangeHandler}
              className="dropdown"
              value={student.course}
            >
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
            type="text"
            value={student._id}
            onChange={inputChangeHandler}
            id="_id"
            name="_id"
            autoComplete="off"
            placeholder="Student ID"
            disabled
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="fees">Fees</label>
          <input
            type="fees"
            onChange={inputChangeHandler}
            value={student.fees}
            id="fees"
            name="fees"
            autoComplete="off"
            placeholder="fees"
          />
        </div>
        {errors.fees && <div className="error">{errors.fees}</div>}

        <div className="inputGroup">
          <label htmlFor="courseStart">Course Start</label>
          <input
            type="date"
            onChange={inputChangeHandler}
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
            onChange={inputChangeHandler}
            id="courseEnd"
            name="courseEnd"
            autoComplete="off"
            placeholder="courseEnd"
          />
        </div>
        {errors.courseEnd && <div className="error">{errors.courseEnd}</div>}

        <div className="inputGroup">
          <button type="submit">UPDATE student</button>
        </div>
        <br />
        <Link to="/add" className="button">
          Back
        </Link>
      </form>
    </div>
  );
};

export default Edit;
