import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";

import LandingPage from "./Pages/Landing";
import CreateClass from "./Pages/CreateClass";
import Classroom from "./Pages/Classroom";
import Joined from "./Pages/Joined";
import InstrClass from "./Pages/InstrClass";
import InstructorClassroomStart from "./Pages/InstrView";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/createClass" element={<CreateClass />} />
          <Route path="/classroom/start/:id" element={<Classroom />} />
          <Route path="/joined/:id" element={<Joined />} />
          <Route path="/classroom/:id" element={<InstrClass />} />
          <Route path="/classroom/instructor/:id" element={<InstructorClassroomStart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
