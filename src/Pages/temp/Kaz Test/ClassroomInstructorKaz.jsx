// ClassroomInstructorNew.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams, useLoaderData, useNavigate } from "react-router-dom";
import socket from "../../../socket";
import "./ClassroomInstructorKaz.css";
import QuestionsList from "../components/QuestionsList";
import CreateQuestionForm from "../components/CreateQuestionForm";
import { postQuestion, getAnswers } from "../../../Services/api";
import Dashboard from "./NavBarPages/Dashboard.jsx"
import Statistics from "./NavBarPages/Statistics";



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
        <hr/>
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
      
      <div className="Content">
        
         <div className="Profile">
          <div className="ProfileBox">
            <h1 className="ProfileHeader"> {classroomData.name}'s Room</h1>
          </div>
          <div className="NextClassBox">
            <h1 className="ProfileHeader">Join Code: {classroomData.joinCode}</h1>
          </div>
          
        </div>
        <div className="Display">
          {activeNavItem && content[activeNavItem]}
        </div> 
      </div>
    </div>
  );
};

export default ClassroomInstructorView;
