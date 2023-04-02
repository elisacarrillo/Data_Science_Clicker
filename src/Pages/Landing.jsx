import React, { useState } from "react";
import "./Landing.css";

function NewLanding() {
  const [code, setCode] = useState("");
  const [netid, setNetid] = useState("");
  const [showJoined, setShowJoined] = useState(false);
  const [classroomId, setClassroomId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: form submission logic
    joinClass();
    
  };
  const joinClass = async () => {
    console.log("Join Class");
    // query to find classroomId from code
    const response = await fetch("http://localhost:3000/api/classrooms?joinCode="+code, {
        method: 'GET',
        
        headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            console.log("DATA", data.data[0]._id)
            var id = data.data[0]._id;
            console.log(id);
            setClassroomId( data.data[0]._id);
            console.log(id);
                    })
        .catch((error) => {

            console.error('Error:', error);
        });
        console.log("CLASSROOMID", classroomId);
           
        const resp2 = await fetch("http://localhost:3000/api/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                netid: netid,
                name: netid,
                email: "null",
                role: "student",
                classrooms: [classroomId]
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                console.log("big success");
                window.location.href ="/joined/"+classroomId;
                
          
            })
            .catch((error) => {
                console.error('Error:', error);
            });




            
    
   
    
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
            <a href="/settings">Settings</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NewLanding;
