import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./student.css";
import { Link } from "react-router-dom";

const Student = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getall");
      setStudents(response.data);
    };

    fetchData();
  }, []);

  const deleteStudent = async (_id) => {
    await axios
      .delete(`http://localhost:8000/api/delete/${_id}`)
      .then(() => {
        setStudents((prevStudent) =>
          prevStudent.filter((student) => student._id !== _id)
        );
        toast.success("Student Deleletd Successfuly", {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="studentTable">
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>Course</th>
            <th>Fees</th>
            <th>Course Start</th>
            <th>Course End</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            return (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>
                  {student.fname} {student.lname}
                </td>
                <td>{student._id}</td>
                <td>{student.course}</td>
                <td>{student.fees}</td>
                <td>{new Date(student.courseStart).toLocaleString()}</td>
                <td>{new Date(student.courseEnd).toLocaleString()}</td>
                <td>
                  {calculateDuration(student.courseStart, student.courseEnd)}
                </td>

                <td className="actionButtons">
                  <button onClick={() => deleteStudent(student._id)}>
                    {" "}
                    Delete
                  </button>
                  <br />
                  <Link to={`/edit/` + student._id}>Update</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <Link to={"/"} className="addButton">
        Back
      </Link>
    </div>
  );
};
const calculateDuration = (start, end) => {
  const durationInMillis = new Date(end) - new Date(start);
  const seconds = Math.floor(durationInMillis / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return `${days}D:${hours % 24}H:${minutes % 60}M:${seconds % 60}S`;
};
export default Student;
