import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { joinClassroom, createClassroom, getClassroom } from "../Services/api";
import { login } from "../Services/auth";
import "./LandingPage.css";

function Landing({
  isAuthenticated,
  setIsAuthenticated,
  user,
  setUser,
  classroomData,
  setClassroomData,
}) {
  const navigateTo = useNavigate();
  const [joinCode, setJoinCode] = useState("");
  const [netid, setNetid] = useState("");

  const handleAuth = async () => {
    try {
      const res = await login(netid);
      if (!res) {
        alert("Invalid netid or password");
        return false;
      }
      if (res.isAuthenticated) {
        setIsAuthenticated(true);
        setUser(res.user);
        return res.user;
      } else {
        const { user } = await register(netid);
        setIsAuthenticated(true);
        setUser(user);
        return user;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleJoinClassroom = async (e) => {
    e.preventDefault();
    const user = await handleAuth();
    if (!user) {
      alert("Authentication failed, please try again");
      return;
    }
    const { classroom, student } = await joinClassroom(joinCode, netid);
    if (classroom) {
      setClassroomData(classroom);
      navigateTo(`/classroom/${classroom._id}/student`);
    } else {
      alert("Failed to join classroom, please try again");
    }
  };

  const handleCreateClassroom = async (e) => {
    e.preventDefault();
    const user = await handleAuth();
    if (!user) {
      alert("Authentication failed, please try again");
      return;
    }
    const classroomName = prompt("Classroom Name");
    const response = await createClassroom(joinCode, user._id, classroomName);
    if (response) {
      const classroom = response.item;
      setClassroomData(classroom);
      navigateTo(`/classroom/${classroom._id}/instructor`);
    } else {
      alert("Failed to create classroom, please try again");
    }
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
          required
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
          required
        />
        <button onClick={handleJoinClassroom}>Join</button>
        <button onClick={handleCreateClassroom}>Create Classroom</button>
        <Link to="/test/home">test</Link>
      </form>
    </div>
  );
}

export default Landing;
