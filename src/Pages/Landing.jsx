import React, { useState } from "react";

import { joinClassroom, createClassroom } from "../Services/api";
import { login } from "../Services/auth";
import "./Landing.css";

function Landing({ isAuthenticated, setIsAuthenticated, user, setUser }) {
  const [joinCode, setJoinCode] = useState("");
  const [netid, setNetid] = useState("");

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
    await handleAuth();
    const { classroom, user } = await joinClassroom(joinCode, netid);
    window.location.href = `/classroom/${classroom._id}/student`;
  };

  const handleCreateClassroom = async (e) => {
    e.preventDefault();
    const user = await handleAuth();
    const classroomName = prompt("Classroom Name");
    const response = await createClassroom(joinCode, user._id, classroomName);
    const classroom = response.item;
    window.location.href = `/classroom/${classroom._id}/instructor`;
  };

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
