import React, { useState } from "react";
import { login, register } from "../Services/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ isAuthenticated, setIsAuthenticated, user, setUser }) {
  const navigateTo = useNavigate();
  const [netid, setNetid] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(netid);
      if (!res) {
        alert("Invalid netid or password");
        return false;
      } else if (res.isAuthenticated) {
        setIsAuthenticated(true);
        setUser(res.user);
        navigateTo("/profile");
      } else {
        const { user } = await register(netid);
        if (!user) {
          alert("Failed to register, please try again");
          return false;
        }
        setIsAuthenticated(true);
        setUser(user);
        navigateTo("/profile");
      }
    } catch (err) {
      alert("Error while logging in");
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
