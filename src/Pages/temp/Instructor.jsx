// Instructor.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Helpers/AuthProvider";
import { createClassroom, getCreatedClassrooms } from "../../Services/api";
import "./Home0.css"

const Instructor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    getCreatedClassrooms(user).then((response) => {
      setClassrooms(response.data);
    });
  }, [user]);

  return (
    <div className="Instructor">
      <div className="HomeTop">
      </div>
          <h1 className="header">Data Science Clicker</h1>
          <h1>Instructor {user}</h1>
          <ul>
            {classrooms.map((classroom) => (
              <li key={classroom._id}>
                <Link to={`/instructor/classroom/${classroom._id}`}>
                  {classroom.name}
                </Link>
              </li>
            ))}
          </ul>
          <CreateClassForm />
          <Link to="/">Back</Link>
       <div className="HomeBottom"></div>
    </div>
  );
};

const CreateClassForm = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const handleCreateClassroom = async () => {
    try {
      const data = await createClassroom(name, user, joinCode);
      console.log(data);
      navigate(`/classroom/instructor/${data._id}`);
    } catch (error) {
      console.log(error);
      alert("Error creating class");
    }
  };

  if (!user) return <Link to="/">Back</Link>;
  return (
    <div className="CreateClassForm">
      <form>
        <input
          type="text"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={joinCode}
          placeholder="join code"
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <button onClick={handleCreateClassroom} className="button0">Create</button>
      </form>
    </div>
  );
};

export default Instructor;
