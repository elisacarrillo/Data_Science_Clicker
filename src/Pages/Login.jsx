import React, { useEffect, useState } from "react";

import { checkAuth, login } from "../Services/auth";

function Login() {
  const [netid, setNetid] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(netid);
    if (res.isAuthenticated) {
      window.location.href = "/";
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
    </div>
  );
}

export default Login;
