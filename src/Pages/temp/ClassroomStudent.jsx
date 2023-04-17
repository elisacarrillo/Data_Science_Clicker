// ClassroomStudent.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams, useLoaderData } from "react-router-dom";
import socket from "../../socket";

const ClassroomStudent = () => {
  const { classroomId } = useParams();
  const { classroomData, questionsData } = useLoaderData();
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [submittedAnswer, setSubmittedAnswer] = useState(null);

  useEffect(() => {
    socket.emit("joinClassroom", classroomId);

    socket.on("questionActivated", (data) => {
      setActiveQuestion(data);
    });

    return () => {
      socket.emit("leaveClassroom", classroomId);
      socket.off("questionActivated");
    };
  }, [classroomId]);

  return !classroomData ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>{classroomData.name}</h1>
      <h2>Join Code: {classroomData.joinCode}</h2>
      <Link to="/">Back</Link>
      {activeQuestion != null && <Question question={activeQuestion} />}
    </div>
  );
};

const Question = ({ question, submittedAnswer, setSubmittedAnswer }) => {
  return (
    <div>
      <h1>{question.prompt}</h1>
      {question.type == "multiple-choice" ? (
        question.multipleChoiceAnswers.map((answer, index) => (
          <div key={index}>
            <input type="radio" value={answer} />
            <label>{answer}</label>
          </div>
        ))
      ) : (
        <input
          type="text"
          value={submittedAnswer}
          onChange={(e) => setSubmittedAnswer(e.target.value)}
        />
      )}
    </div>
  );
};

export default ClassroomStudent;
