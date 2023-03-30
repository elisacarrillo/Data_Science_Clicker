import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from './Components/Landing';
import CreateClass from './Components/CreateClass';
import Classroom from './Components/Classroom';
import Joined from './Components/Joined';
import InstrClass from './Components/InstrClass';

function App() {
  return (
    <div className="app">
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/createClass" element={<CreateClass />} />
        <Route path="/classroom/start/:id" element = {<Classroom />} /> 
        <Route path="/joined/:id" element = {<Joined />} />
        <Route path="/classroom/:id" element={<InstrClass />} />
      </Routes>
    </Router>
    </div>

  )
}

export default App;
