import react, { useEffect } from 'react';
import { useState } from 'react';
const Joined = () => {
    const [classCode, setClassCode] = useState("");
    const getClassCode = () => {
        console.log("Get Class Code");
        // get class code from url
        var url = window.location.href;
        var classCode = url.substring(url.lastIndexOf('/') + 1);
        setClassCode(classCode);
        console.log(classCode);
    }
    const start = () => {
        console.log("Start");
        
        window.location.href="/classroom/start/"+classCode;
    }
    useEffect(() => {
        getClassCode();
    }, []);
    return (
    <div className="App">
        <p>You have successfully joined class {classCode}</p>
        <button onClick={start}>Start Answering Questions!</button>
    </div>
    );
}

export default Joined;