import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* NOTE: This page has horrible naming, needs to be fixed */
const ClassroomStudentView = () => {
  const [classCode, setClassCode] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const getClassCode = () => {
    console.log("Get Class Code");
    // get class code from url
    var url = window.location.href;
    // get class code from url
    // it is after the second slash
    var classCode = url.split("/")[4];
    getJoinCode(classCode);
    setClassCode(classCode);
    console.log(classCode);
  };
  const getJoinCode = async (classCode) => {
    const response = await fetch(
      "http://localhost:3000/api/classrooms?_id=" + classCode,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        console.log("DATA", data.data[0].joinCode);
        var id = data.data[0]._id;
        console.log(id);
        setJoinCode(data.data[0].joinCode);
        console.log(id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const start = () => {
    console.log("Start");
    console.log(classCode);
    window.location.href = "/classroom/" + classCode + '/student/start_test';
  };
  useEffect(() => {
    getClassCode();
    getJoinCode();
  }, []);
  return (
    <div className="App">
      <p>You have successfully joined class {joinCode}</p>
      <button onClick={start}>Start Answering Questions!</button>
    </div>
  );
};

export default ClassroomStudentView;
