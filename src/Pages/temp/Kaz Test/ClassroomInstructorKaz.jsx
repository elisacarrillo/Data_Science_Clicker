
// ClassroomStudent.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams, useLoaderData } from "react-router-dom";
import socket from "../../../socket";
import "./ClassroomInstructorKaz.css";

const Dashboard = () => {
    return (
        <h1> Dashboard</h1>
    );
};
const CreateClass = () => {
    return (
        <h1> CreateClass</h1>
    );
};
const CreateQuestion = () => {
    return (
        <h1> CreateQuestion</h1>
    );
};
const Statistics = () => {
    return (
        <h1> Statistics</h1>
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
    const [activeNavItem, setActiveNavItem] = useState(null);
    const { classroomId } = useParams();
    const { classroomData, questionsData } = useLoaderData();
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [submittedAnswer, setSubmittedAnswer] = useState(null);
    
    const content = {
    dash: <Dashboard/>,
    createCourse: <CreateClass/>,
    createQuestion: <CreateQuestion/>,
    stats: <Statistics/>,
    };

    return (
    <div className="InstructorViewKaz">
        <div className="NavBar0">
        <h1> Data Science Clicker</h1>
        <div className="Nav">
            <NavItem
            isActive={activeNavItem === "dash"}
            onClick={() => setActiveNavItem("dash")}
            >
            Dashboard
            </NavItem>
            <NavItem
            isActive={activeNavItem === "createCourse"}
            onClick={() => setActiveNavItem("createCourse")}
            >
            Create Course
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
        </div>
        </div>
        <div className="Content">{activeNavItem && content[activeNavItem]}</div>
    </div>
    );
};

export default ClassroomInstructorView;

