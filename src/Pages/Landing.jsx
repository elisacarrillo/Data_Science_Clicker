import React, { useState } from "react";

import { joinClassroom, createClassroom } from "../Services/api";
import { login } from "../Services/auth";
import "./Landing.css";

function Landing({ isAuthenticated, setIsAuthenticated, user, setUser }) {
  const [joinCode, setJoinCode] = useState("");
  const [netid, setNetid] = useState("");
  const [classroomId, setClassroomId] = useState("");

  const handleAuth = async () => {
    const res = await login(netid);
    if (!res.isAuthenticated) {
      alert("Authentication failed, please try again.");
      return null;
    } else {
      setIsAuthenticated(true);
      setUser(res.user);
      return res.user;
    }
  };

  const handleJoinClassroom = async (e) => {
    e.preventDefault();
    console.log("here");
    await handleAuth();
    await joinClassroom(joinCode, netid);
  };

  const handleCreateClassroom = async (e) => {
    e.preventDefault();
    const user = await handleAuth();
    const classroomName = prompt("Classroom Name");
    const response = await createClassroom(joinCode, user._id, classroomName);
    const classroom = response.item;
    window.location.href = `/classroom/${classroom._id}/instructor`;
  };

  // const joinClass = async () => {
  //   console.log("Join Class");
  //   // query to find classroomId from code
  //   const response = await fetch(
  //     "http://localhost:3000/api/classrooms?joinCode=" + code,
  //     {
  //       method: "GET",

  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //       console.log("DATA", data.data[0]._id);
  //       var id = data.data[0]._id;
  //       console.log(id);
  //       setClassroomId(data.data[0]._id);
  //       console.log(id);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  //   console.log("CLASSROOMID", classroomId);

  //   const resp2 = await fetch("http://localhost:3000/api/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       netid: netid,
  //       name: netid,
  //       email: "null",
  //       role: "student",
  //       classrooms: [classroomId],
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //       console.log("big success");
  //       window.location.href = "/joined/" + classroomId;
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  return (
    <div className="container">
      <a
        target="_blank"
        href="https://github.com/elisacarrillo/Data_Science_Clicker"
        className="logo-link"
      >
        <img
          src="/src/assets/ds-clicker-logo.png"
          alt="logo"
          className="logo"
        />
      </a>
      <form className="form">
        <input
          type="text"
          id="joinCode"
          name="joinCode"
          placeholder="Enter 4 digit code here"
          maxLength={4}
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <input
          type="text"
          id="netid"
          name="netid"
          placeholder="NetID"
          minLength={3}
          maxLength={8}
          value={netid}
          onChange={(e) => setNetid(e.target.value)}
        />
        <button onClick={handleJoinClassroom}>Join</button>
        <button onClick={handleCreateClassroom}>Create Classroom</button>
      </form>
    </div>
  );
}

export default Landing;
