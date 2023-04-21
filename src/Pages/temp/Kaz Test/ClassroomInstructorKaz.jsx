// ClassroomInstructorNew.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams, useLoaderData, useNavigate } from "react-router-dom";
import socket from "../../../socket";
import "./ClassroomInstructorKaz.css";
import QuestionsList from "../components/QuestionsList";
import CreateQuestionForm from "../components/CreateQuestionForm";
import { postQuestion, getAnswers } from "../../../Services/api";

const Dashboard = ({ classroomData }) => {
  return (
    <>
      <h1>{classroomData.name} Dashboard</h1>
      <h2>Join Code: {classroomData.joinCode}</h2>
    </>
  );
};

const Statistics = ({ questions }) => {
  //   console.log("herereerere");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (selectedQuestion) {
      const fetchAnswers = async () => {
        const answersData = await getAnswers(selectedQuestion._id);
        console.log("answers", answersData);
        setAnswers(answersData);
      };
      fetchAnswers();
    }
  }, [selectedQuestion]);

  return (
    <>
      <h1>Statistics</h1>
      <select
        value={selectedQuestion?._id || ""}
        onChange={(e) => {
          const question = questions.find((q) => q._id === e.target.value);
          setSelectedQuestion(question);
        }}
      >
        <option value="">Select a question</option>
        {questions.map((question) => (
          <option key={question._id} value={question._id}>
            {question.prompt}
          </option>
        ))}
      </select>
      {selectedQuestion && (
        <>
          <h2>{selectedQuestion.prompt}</h2>
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>{JSON.stringify(answer)}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

const NavItem = ({ isActive, onClick, children }) => {
  return (
    <div className={`nav-item ${isActive ? "active" : ""}`} onClick={onClick}>
      {children}
    </div>
  );
};

const ClassroomInstructorView = () => {
  const navigate = useNavigate();
  const [activeNavItem, setActiveNavItem] = useState(null);
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

  const content = {
    dash: <Dashboard classroomData={classroomData} />,
    viewQuestions: (
      <QuestionsList
        questions={questions}
        activeQuestion={activeQuestion}
        toggleActiveQuestion={toggleActiveQuestion}
      />
    ),
    createQuestion: (
      <CreateQuestionForm handlePostQuestion={handlePostQuestion} />
    ),
    stats: <Statistics questions={questions} />,
  };

  return (
    <div className="InstructorViewKaz">
      <div className="NavBar0">
        <h1>Data Science Clicker</h1>
        <div className="Nav">
          <NavItem
            isActive={activeNavItem === "dash"}
            onClick={() => setActiveNavItem("dash")}
          >
            Dashboard
          </NavItem>
          <NavItem
            isActive={activeNavItem === "viewQuestions"}
            onClick={() => setActiveNavItem("viewQuestions")}
          >
            View Questions
          </NavItem>
          <NavItem
            isActive={activeNavItem === "createQuestion"}
            onClick={() => setActiveNavItem("createQuestion")}
          >
            Create Question
          </NavItem>
          <NavItem
            isActive={activeNavItem === "stats"}
            onClick={() => setActiveNavItem("stats")}
          >
            Statistics
          </NavItem>
          <NavItem
            isActive={activeNavItem === null}
            onClick={() => navigate("/instructor")}
          >
            Back
          </NavItem>
        </div>
      </div>
      <div className="Content">{activeNavItem && content[activeNavItem]}</div>
    </div>
  );
};

export default ClassroomInstructorView;
