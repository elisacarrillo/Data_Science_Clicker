import { useState, useEffect } from "react";
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
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";

import { checkAuth } from "./Services/auth";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const setAuthStatus = async () => {
      const authenticated = await checkAuth();
      setIsAuthenticated(authenticated);
    };
    setAuthStatus();
  }, []);

  const setAuthStatus = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <div className="app">
      <Router>
        <Header
          isAuthenticated={isAuthenticated}
          setAuthStatus={setAuthStatus}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/createClass" element={<CreateClass />} />
          <Route path="/classroom/start/:id" element={<Classroom />} />
          <Route path="/joined/:id" element={<Joined />} />
          <Route path="/classroom/:id" element={<InstrClass />} />
<<<<<<< HEAD
          <Route path="/classroom/instructor/:id" element={<InstructorClassroomStart />} />
=======
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
>>>>>>> 0fc5d0684b8ef81b0705317881a56c5e3b30146b
        </Routes>
      </Router>
    </div>
  );
}

export default App;
