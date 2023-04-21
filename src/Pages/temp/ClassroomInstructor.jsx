// ClassroomInstructor.jsx

import React, { useState, useEffect } from "react";
import { useParams, useLoaderData, Link } from "react-router-dom";
import { postQuestion } from "../../Services/api";
import socket from "../../socket";
import CreateQuestionForm from "./components/CreateQuestionForm";
import QuestionsList from "./components/QuestionsList";
import "./Classroom.css";

const ClassroomInstructorView = () => {
  const { classroomId } = useParams();
  const { classroomData, questionsData } = useLoaderData();
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState(questionsData);

  useEffect(() => {
    socket.emit("joinClassroom", classroomId);

    return () => {
      socket.emit("leaveClassroom", classroomId);
    };
  }, [classroomId]);

  const handlePostQuestion = async (questionData) => {
    const newQuestion = {
      classroom: classroomData._id,
      ...questionData,
    };

    await postQuestion(newQuestion);
    setQuestions([...questions, newQuestion]);
  };

  const toggleActiveQuestion = (id) => {
    setActiveQuestion(id);
    socket.emit(
      "activateQuestion",
      classroomData._id,
      questions.find((q) => q._id === id)
    );
  };

  return !classroomData ? (
    <div>Loading...</div>
  ) : (
    <div className="Classroom0">
      <div className="Content0">
        <h1>{classroomData.name}</h1>
        <h2>Instructor {classroomData.instructor}</h2>
        <h2>Join Code: {classroomData.joinCode}</h2>
        <Link to="/instructor">Back</Link>
        <QuestionsList
          questions={questions}
          activeQuestion={activeQuestion}
          toggleActiveQuestion={toggleActiveQuestion}
        />
        <CreateQuestionForm handlePostQuestion={handlePostQuestion} />
      </div>
    </div>
  );
};

export default ClassroomInstructorView;
