import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Link,
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";

// import LandingPage from "./Pages/LandingPage";
// import CreateClass from "./Pages/CreateClass";
// import Classroom from "./Pages/Classroom";
// import ClassroomStudentView from "./Pages/ClassroomStudentView";
// import ClassroomInstructorView from "./Pages/ClassroomInstructorView";

// import InstructorClassroomStart from "./Pages/InstrView";
// import Login from "./Pages/Login";
// import Profile from "./Pages/Profile";
// import DownloadCSV from "./Pages/DownloadCSV";
// import ClassroomTest from "./Pages/ClassroomStartTest";

import AuthProvider from "./Helpers/AuthProvider";

import TestHome from "./Pages/temp/Home";
import TestCreateClass from "./Pages/temp/CreateClass";
import TestClassroomInstructor from "./Pages/temp/ClassroomInstructor";
import TestClassroomStudent from "./Pages/temp/ClassroomStudent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TestHome />,
  },
  {
    path: "/createClass",
    element: <TestCreateClass />,
  },
  {
    path: "/classroom/instructor/:id",
    element: <TestClassroomInstructor />,
  },
  {
    path: "/classroom/student/:id",
    element: <TestClassroomStudent />,
  },
  // {
  //   path: "/",
  //   element: <LandingPage />,
  // },
  // {
  //   path: "/createClass",
  //   element: <CreateClass />,
  // },
  // {
  //   path: "/classroom/:id/student",
  //   element: <ClassroomStudentView />,
  // },
  // {
  //   path: "/classroom/:id/student/start",
  //   element: <Classroom />,
  // },
  // {
  //   path: "/classroom/:id/instructor",
  //   element: <ClassroomInstructorView />,
  // },
  // {
  //   path: "/classroom/instructor/:id",
  //   element: <InstructorClassroomStart />,
  // },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  // {
  //   path: "/profile",
  //   element: <Profile />,
  // },
  // {
  //   path: "/download",
  //   element: <DownloadCSV />,
  // },
  // {
  //   path: "/classroom/:id/student/start_test",
  //   element: <ClassroomTest />,
  // },
  // {
  //   path: "/download",
  //   element: <DownloadCSV />,
  // },
]);

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
  /* PREVIOUS APP BELOW
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [classroomData, setClassroomData] = useState(null);

  useEffect(() => {
    const setAuthStatus = async () => {
      const response = await checkAuth();
      setIsAuthenticated(response.isAuthenticated);
      setUser(response.user);
    };
    setAuthStatus();
  }, []);

  return (
    <div className="app">
      <Router>
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          user={user}
          setUser={setUser}
        />
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                user={user}
                setUser={setUser}
                classroomData={classroomData}
                setClassroomData={setClassroomData}
              />
            }
          />
          <Route path="/createClass" element={<CreateClass />} />
          <Route
            path="/classroom/:id/student"
            element={
              <ClassroomStudentView
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                user={user}
                setUser={setUser}
                classroomData={classroomData}
                setClassroomData={setClassroomData}
              />
            }
          />
          <Route path="/classroom/:id/student/start" element={<Classroom />} />
          <Route
            path="/classroom/:id/instructor"
            element={
              <ClassroomInstructorView
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                user={user}
                setUser={setUser}
                classroomData={classroomData}
                setClassroomData={setClassroomData}
              />
            }
          />

          <Route
            path="/classroom/instructor/:id"
            element={
              <InstructorClassroomStart
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                user={user}
                setUser={setUser}
              />
            }
          />

          <Route
            path="/login"
            element={
              <Login
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                user={user}
                setUser={setUser}
                classroomData={classroomData}
                setClassroomData={setClassroomData}
              />
            }
          />
          <Route
            path="/classroom/:id/student/start_test"
            element={
              <ClassroomTest
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                user={user}
                setUser={setUser}
                classroomData={classroomData}
                setClassroomData={setClassroomData}
              />
            }
          />
          <Route path="/download" element={<DownloadCSV />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
  */
}

export default App;
