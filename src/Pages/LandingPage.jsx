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
    await handleAuth();
    const { classroom, user } = await joinClassroom(joinCode, netid);
    setClassroomData(classroom);
    navigateTo(`/classroom/${classroom._id}/student`);
  };

  const handleCreateClassroom = async (e) => {
    e.preventDefault();
    const user = await handleAuth();
    const classroomName = prompt("Classroom Name");
    const response = await createClassroom(joinCode, user._id, classroomName);
    const classroom = response.item;
    setClassroomData(classroom);
    navigateTo(`/classroom/${classroom._id}/instructor`);
  };

  const testfn = async () => {
    const res = await getClassroom(`642a183993e72999868a6c9a`);
    console.log(res);
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
        <button onClick={testfn}>Test</button>
      </form>
    </div>
  );
}

export default Landing;
