import react, { useEffect } from 'react';
import { useState } from 'react';


const InstrClass = () => {
    const [classId, setClassId] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const [buttonVisible, setButtonVisible] = useState(false);
    const [className, setClassName] = useState("");
    const [classStarted, setClassStarted] = useState(false);
    const [students, setStudents] = useState([]);
    const [id, setId] = useState("");

        useEffect(() => {
            // get class code from url
            const url = window.location.href;
            const classId = url.substring(url.lastIndexOf('/') + 1);
            setClassId(classId);
            console.log(classId);

            // fetch joinCode that matches classId
            fetch ('http://localhost:3000/api/classrooms?_id='+classId, {
                method: 'GET',
                

                headers: {
                    'Content-Type': 'application/json'

                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setJoinCode(data.data[0].joinCode);
                // setClassName(data.data.name);
                // setId(data.data._id);
                // setButtonVisible(true);
            }

            )
            .catch((error) => {
                console.error('Error:', error);
            }
            );



        }, []);
        const getStudents = async () => {
            // get classes and find class id that matches class code
              // get students in class
              // set request mode to  no-cors
              console.log(classId);
              // get all users
            fetch ('http://localhost:3000/api/users?limit=0', {
                method: 'GET',
                credentials: 'include',
                
                headers: {
                    'Content-Type': 'application/json'

                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // get students in class
                const students = data.data.filter(user => user.classrooms.includes(classId));
                console.log(students);
                setStudents(students);
                // set students
                // setStudents(students);
                // setButtonVisible(true);
            }

            )
            .catch((error) => {
                console.error('Error:', error);
            }
            );



         }
            const startClass =  () => {
                console.log("Start Class");
                // get class code from url
                const url = window.location.href;
                const classCode = url.substring(url.lastIndexOf('/') + 1);
                console.log(classId);
                window.location.href = "/classroom/instructor/"+classId;
            }
        //  getStudents();
         

        return (
        <div className="App">
            <p>Welcome to Classroom {joinCode}</p>
            {/* map out students */}
            <button onClick={getStudents}>Get Students</button>
            <p>Joined Students: </p>
            {/* <ul> */}
            {students.map((student) => (
                <p>{student.name}</p>
            ))}
            

            {/* </ul> */}
            <button onClick={startClass}>Start Class</button>

        </div>
        );
    }

    export default InstrClass;