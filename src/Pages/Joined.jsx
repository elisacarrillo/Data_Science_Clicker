import react, { useEffect } from 'react';
import { useState } from 'react';


/* NOTE: This page has horrible naming, needs to be fixed */
const Joined = () => {
    const [classCode, setClassCode] = useState("");
    const [classroomId, setClassroomId] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const getClassCode = () => {
        console.log("Get Class Code");
        // get class code from url
        var url = window.location.href;
        var classCode = url.substring(url.lastIndexOf('/') + 1);
        setClassCode(classCode);
        console.log(classCode);
    }
    const getJoinCode = async () => {
        const response = await fetch("http://localhost:3000/api/classrooms?_id="+classCode, {
        method: 'GET',
        
        headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            console.log("DATA", data.data[0].joinCode)
            var id = data.data[0]._id;
            console.log(id);
            setJoinCode( data.data[0].joinCode);
            console.log(id);
                    })
        .catch((error) => {

            console.error('Error:', error);
        });

    }
    const start = () => {
        console.log("Start");
        
        window.location.href="/classroom/start/"+classCode;
    }
    useEffect(() => {
        getClassCode();
        getJoinCode();
    }, []);
    return (
    <div className="App">
        <p>You have successfully joined class {joinCode}</p>
        <button onClick={start}>Start Answering Questions!</button>
    </div>
    );
}

export default Joined;