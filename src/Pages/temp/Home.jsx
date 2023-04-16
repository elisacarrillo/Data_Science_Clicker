// Home.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { joinClassroom } from "../../Services/api";

const Home = () => {
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

  return (
    <div>
      <input
        type="text"
        value={uid}
        placeholder="netid"
        onChange={(e) => setUid(e.target.value)}
      />
      <input
        type="text"
        value={joinCode}
        placeholder="join code"
        onChange={(e) => setJoinCode(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
      <Link to="/createClass">Create Class</Link>
    </div>
  );
};

export default Home;
