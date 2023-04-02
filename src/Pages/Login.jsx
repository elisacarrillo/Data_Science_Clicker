import React, { useState } from "react";
import { login, register } from "../Services/auth";
import "./Login.css";

function Login({ setIsAuthenticated, setUser }) {
  const [netid, setNetid] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(netid);
      if (res.isAuthenticated) {
        setIsAuthenticated(true);
        setUser(res.user);
        window.location.href = "/profile";
      } else {
        const { user } = await register(netid);
        setIsAuthenticated(true);
        setUser(user);
        window.location.href = "/profile";
      }
    } catch (err) {
      console.log(err);
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
