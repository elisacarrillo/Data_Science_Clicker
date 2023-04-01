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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const setAuthStatus = async () => {
      const response = await checkAuth();
      setIsAuthenticated(response.isAuthenticated);
      setUser(response.user);
    };
    setAuthStatus();
  }, []);

  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);
  return (
    <div className="app">
      <Router>
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          user={user}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/createClass" element={<CreateClass />} />
          <Route path="/classroom/start/:id" element={<Classroom />} />
          <Route path="/joined/:id" element={<Joined />} />
          <Route path="/classroom/:id" element={<InstrClass />} />

            <Route path="/classroom/instructor/:id" element={<InstructorClassroomStart />} />

            <Route path="/login" element={<Login />} />
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            }
          />

          <Route path="*" element={<h1>404 Not Found</h1>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
