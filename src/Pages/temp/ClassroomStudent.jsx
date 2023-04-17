// ClassroomStudent.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ClassroomStudent = () => {
  const { classroomId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    socket.emit("joinClassroom", classroomId);

    socket.on;
  });
};

export default ClassroomStudent;
