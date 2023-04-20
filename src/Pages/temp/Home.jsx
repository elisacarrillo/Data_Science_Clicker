// Home.jsx

import React, { useState, useEffect } from "react";
import { useAuth } from "../../Helpers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { getClassroomFromJoinCode } from "../../Services/api";

import "./temp.css";
import "./Home0.css";
import footer from "./spikes.png";

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
      <div className="HomeTop">
        <h1 className="header">Data Science Clicker</h1>
      </div>
      <div className="HomeMiddle">
        <input
          type="text"
          value={uid}
          placeholder="NetID"
          onChange={(e) => setUid(e.target.value)}
        />
        <input
          type="text"
          value={joinCode}
          placeholder="Join Code"
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <button onClick={handleJoin} className="button0">Join Class</button>
        <button onClick={handleInstructorView} className="button0">Instructor View</button>
      </div>
      <div className="HomeBottom">
      </div>
    </div>
  );
};

export default Home;
