import React, { useState } from "react";
import { logout } from "../Services/auth";

function Profile({ user, setIsAuthenticated, setUser }) {
  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log(res);
      setIsAuthenticated(false);
      setUser(null);
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
      <p>NetID: {user.netid}</p>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
