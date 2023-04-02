import React, { useState } from "react";
import { login } from "../Services/auth";
import "./Login.css";

function Login({ setIsAuthenticated, setUser }) {
  const [netid, setNetid] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(netid);
    if (res.isAuthenticated) {
      window.location.href = "/profile";
    } else {
      alert("Login failed, please try again.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form-group">
        <input
          onChange={(e) => setNetid(e.target.value)}
          type="text"
          name="netid"
          value={netid}
          placeholder="NetID"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
