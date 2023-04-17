// Home.jsx

import React, { useState, useEffect } from "react";
import { useAuth } from "../../Helpers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import {} from "../../Services/api";

const Home = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState("");
  const [uid, setUid] = useState("");

  const handleJoin = async () => {
    try {
      const data = await joinClassroom(joinCode, uid);
      console.log(data);
      navigate(`/classroom/student/${response.data._id}`);
    } catch (error) {
      console.log(error);
      alert("Error joining class");
    }
  };

  const handleInstructorView = () => {
    setUser(uid);
    navigate("/instructor");
  };

  return (
    <div className="Home">
      <input
        type="text"
        value={uid}
        placeholder="netid"
        onChange={(e) => setUid(e.target.value)}
      />
      {uid && <button onClick={handleInstructorView}>Instructor View</button>}
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
