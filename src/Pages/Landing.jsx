import React, { useState } from "react";
import "./Landing.css";

function NewLanding() {
  const [code, setCode] = useState("");
  const [netid, setNetid] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: form submission logic
    alert("form logic not implemented yet");
  };

  return (
    <div className="container">
      <a
        target="_blank"
        href="https://github.com/elisacarrillo/Data_Science_Clicker"
        className="logo-link"
      >
        <img
          src="/src/assets/ds-clicker-logo.png"
          alt="logo"
          className="logo"
        />
      </a>
      <form className="form" onSubmit={handleSubmit}>
        {/* <label htmlFor="code">Join code:</label> */}
        <input
          type="text"
          id="code"
          name="code"
          placeholder="Enter 4 digit code here"
          maxLength={4}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {/* <label htmlFor="netid">NetID:</label> */}
        <input
          type="text"
          id="netid"
          name="netid"
          placeholder="Enter NetID here"
          minLength={3}
          maxLength={8}
          value={netid}
          onChange={(e) => setNetid(e.target.value)}
        />
        <button type="submit">Join</button>
      </form>

      <div className="dev-links">
        <h3>This section is for developing purposes only</h3>
        <ul>
          <li>
            <a href="/createClass">Create a class</a>
          </li>
          <li>
            <a href="/join">Join a class</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NewLanding;
