import react, { useEffect } from 'react';
import { useState } from 'react';

const InstrClass = () => {
    const [classCode, setClassCode] = useState("");
    const [buttonVisible, setButtonVisible] = useState(false);
    const [className, setClassName] = useState("");
    const [classStarted, setClassStarted] = useState(false);
    const [students, setStudents] = useState([]);
    const [id, setId] = useState("");

        useEffect(() => {
            // get class code from url
            const url = window.location.href;
            const classCode = url.substring(url.lastIndexOf('/') + 1);
            setClassCode(classCode);
            console.log(classCode);


        }, []);
        const getStudents = async () => {
            // get classes and find class id that matches class code
              // get students in class
              // set request mode to  no-cors
              console.log(classCode);
                 fetch ('http://localhost:3000/api/classroom/'+classCode+'/student', {
                     method: 'GET',
                     headers: {
                         'Content-Type': 'application/json'


                     },
                      



                     
                 })
                 .then(response => response.json())
                 .then(data => {
                     console.log('Success:', data);
                     setStudents(data);
                     // query students in class and set students to that
                    


                     // setStudents(data.data);
                     // setShowStudents(true);
                     //get students in class
                    //  console.log(data);
                    //  for (var i = 0; i < data.total; i++) {
                    //      console.log(data.data[i].code);
                    //      if (data.data[i].code == classCode) {
                    //          console.log("class exists");
                    //          // get class id
                    //          console.log(data.data[i]._id);
                    //          // setStudents to students in class
                    //          fetch ('http://localhost:3000/api/classroom/'+data.data[i]._id+'/student', {
                    //              method: 'GET',
                    //              headers: {
                    //                  'Content-Type': 'application/json'
                    //              },
                    //          })
                    //          .then(response => response.json())
                    //          .then(data => {
                    //              console.log('Success:', data);
                    //              for (var i = 0; i < data.total; i++) {
                    //                  if (data.data[i].code == classCode) {
                    //                      console.log("student exists");
                    //                      console.log(data.data[i]);
                    //                  }
                    //              }
                    //              // setStudents(data.data);
                    //              // setShowStudents(true);
                    //          })
                    //          .catch((error) => {
                    //              console.error('Error:', error);
                    //          });
                    //      }
                    //  }
                 })
                 .catch((error) => {
                     console.error('Error:', error);
                 });
         }
            const startClass =  () => {
                console.log("Start Class");
                // get class code from url
                const url = window.location.href;
                const classCode = url.substring(url.lastIndexOf('/') + 1);
                console.log(classCode);
                window.location.href = "/classroom/start/"+classCode;
            }
        //  getStudents();
         

        return (
        <div className="App">
            <p>Welcome to Classroom {classCode}</p>
            {/* map out students */}
            <button onClick={getStudents}>Get Students</button>
            <p>Joined Students: </p>
            {/* <ul> */}
                {students.map((student) => (
                    <p>{student}</p>
                ))}

            {/* </ul> */}
            <button onClick={startClass}>Start Class</button>

        </div>
        );
    }

    export default InstrClass;