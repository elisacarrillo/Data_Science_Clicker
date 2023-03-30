import react from 'react';
import { useState } from 'react';
const Joined = () => {
    const [classCode, setClassCode] = useState([""]);
    const getClassCode = () => {
        console.log("Get Class Code");
        // get class code from url
        var url = window.location.href;
        var classCode = url.substring(url.lastIndexOf('/') + 1);
        setClassCode(classCode);
        console.log(classCode);
    }
    return (
    <div className="App">
        <p>You have successfully joined class {classCode}</p>
    </div>
    );
}

export default Joined;