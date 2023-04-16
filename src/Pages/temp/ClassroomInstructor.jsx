// ClassroomInstructor.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../../socket";

const ClassroomInstructorView = () => {
  const { id } = useParams();
  useEffect(() => {
    socket.emit("joinClassroom", id);

    return () => {
      socket.emit("leaveClassroom", id);
    };
  }, []);
  return <h1>hello</h1>;
};

export default ClassroomInstructorView;
