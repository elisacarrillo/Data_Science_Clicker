// Home.jsx

import React, { useState, useEffect } from "react";
import { useAuth } from "../../Helpers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { getClassroomFromJoinCode } from "../../Services/api";

import "./temp.css";

const Home = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState("");
  const [uid, setUid] = useState("");

  const handleJoin = async () => {
    try {
      const response = await getClassroomFromJoinCode(joinCode);
      console.log(response);
      navigate(`/student/classroom/${response.data[0]._id}`);
    } catch (error) {
      console.log(error);
      alert("Error joining class");
    }
  };

  const handleInstructorView = () => {
    if (!uid) {
      alert("Must enter netid");
      return;
    }
    setUser(uid);
    navigate("/instructor");
  };

  return (
    <div className="Home">
      <h1>dsclicker</h1>
      <input
        type="text"
        value={uid}
        placeholder="netid"
        onChange={(e) => setUid(e.target.value)}
      />
      <button onClick={handleInstructorView}>Instructor View</button>
      <input
        type="text"
        value={joinCode}
        placeholder="join code"
        onChange={(e) => setJoinCode(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export default Home;
