import react from 'react';
import { useState } from 'react';


// import axios from 'axios';


const createClass = () => {
    const [classCode, setClassCode] = useState("");
    const [buttonVisible, setButtonVisible] = useState(false);
    const [className, setClassName] = useState("");
    const [classStarted, setClassStarted] = useState(false);
    const [students, setStudents] = useState([]);
    const generateCode = () => {
        console.log("Generate Code");
        // generate random 4 digit code between 1000 and 9999
        setClassCode(Math.floor(Math.random() * 9000 + 1000));
        setButtonVisible(true);

    }
    

                // setStudents(data.data);


    const addClass = () => {

        console.log("Add Class");
        console.log(classCode);
        console.log(className);
        fetch('http://localhost:3000/api/classrooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                joinCode: classCode,
                name: className
            }),
            // remove cors
            
           
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setClassStarted(true);
            // navigate to /classroom
            console.log(data.item._id)
            window.location.href="/classroom/"+data.item._id;

            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        // axios.post('http://localhost:3000/api/classroom', CircularJSON.stringify({
        // code: classCode,
        // name: className
        // }), {
        // headers: {
        //     'Content-Type': 'application/json'
        // }
        // })
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });


    
        
    }
    return (
    <div className="App">
        <p>Create Class</p>
        {!buttonVisible ? <button onClick={generateCode}>Generate Code</button> : null}
        {/* // <button onClick={gen÷erateCo÷de}>Generate Code</button> */}
        { buttonVisible ? <>
        <p>Class Code: {classCode}</p>
        <input type="text" name="name" onChange={
            // set className to the value of the input
            (e) => setClassName(e.target.value)
        } placeholder="Class Name"/>
        <br></br>
        <br></br>
        { !classStarted ? <button onClick={addClass}>Start Class</button> : <><p>Class Started!</p>
        <p>Joined Students:</p>
        {students.map((student) => {
            return <p>{student.name}</p>
        })}
        </>}
        
        </> : null}
       

    </div>
    );
}

export default createClass;