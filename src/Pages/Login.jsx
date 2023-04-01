import React, { useEffect, useState } from "react";

import { checkAuth, login } from "../Services/auth";

function Login({ setIsAuthenticated, setUser }) {
  const [netid, setNetid] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("logging in...");
    const res = await login(netid);
    console.log("\t", res);
    if (res.isAuthenticated) {
      setIsAuthenticated(true);
      setUser(res.user);
      window.location.href = "/";
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <label htmlFor="netid">NetID:</label>
        <input
          onChange={(e) => setNetid(e.target.value)}
          type="text"
          name="netid"
          value={netid}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={async () => console.log(await checkAuth())}>
        Check Auth
      </button>
    </div>
  );
}

export default Login;
