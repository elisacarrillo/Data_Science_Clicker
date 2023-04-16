// CreateClass.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClassroom } from "../../Services/api";

const CreateClass = () => {
  const navigate = useNavigate();
  const [className, setClassName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [instructorID, setInstructorID] = useState("");

  const handleCreateClass = async () => {
    try {
      const data = await createClassroom(joinCode, instructorID, className);
      navigate(`/classroom/${data._id}/student`);
    } catch (error) {
      console.log(error);
      alert("Error creating class");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={className}
        placeholder="Class name"
        onChange={(e) => setClassName(e.target.value)}
      />
      <input
        type="text"
        value={joinCode}
        placeholder="Join code"
        onChange={(e) => setJoinCode(e.target.value)}
      />
      <button onClick={handleCreateClass}>Create Class</button>
    </div>
  );
};

export default CreateClass;
