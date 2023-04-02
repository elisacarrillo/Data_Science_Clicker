import React, { useEffect, useState } from "react";
import { logout } from "../Services/auth";
import { getCreatedClassrooms, getJoinedClassrooms } from "../Services/api";

import "./Profile.css";

function Profile({ isAuthenticated, setIsAuthenticated, user, setUser }) {
  const [joinedClassrooms, setJoinedClassrooms] = useState([]);
  const [createdClassrooms, setCreatedClassrooms] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        if (user?._id) {
          const res1 = await getCreatedClassrooms(user._id);
          setCreatedClassrooms(res1.data);

          const res2 = await getJoinedClassrooms(user._id);
          setJoinedClassrooms(res2.classrooms);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetch();
  }, [user]);

  const handleLogout = async () => {
    try {
      const res = await logout();
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <h1>Profile</h1>
        <p>Not logged in</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div className="row-container">
        <div className="container">
          <h2>Created Classrooms</h2>
          {!createdClassrooms || !createdClassrooms.length ? (
            <>No classrooms</>
          ) : (
            <ul>
              {createdClassrooms.map((classroom) => (
                <li key={`created${classroom._id}`}>
                  <a href={`/classroom/${classroom._id}/instructor`}>
                    {classroom.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="container">
          <h2>Joined Classrooms</h2>
          {!joinedClassrooms || !joinedClassrooms.length ? (
            <>No classrooms</>
          ) : (
            <ul>
              {joinedClassrooms.map((classroom) => (
                <li key={`join${classroom._id}`}>
                  <a href={`/classroom/${classroom._id}/student`}>
                    {classroom.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Back to home
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
