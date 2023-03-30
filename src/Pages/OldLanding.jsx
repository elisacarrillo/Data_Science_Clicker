import react from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';


const LandingPage = () => {
  const [classCode, setClassCode] = useState("");
  const [studentName, setStudentName] = useState("");
  const [showJoined, setShowJoined] = useState(false);

    const joinClass = () => {
        console.log("Join Class");
        fetch ('http://localhost:3000/api/classroom/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {

          // query for whether the class exists, by checking if classCode is an existing classCode in the list of classes

          // if it does, then add the student to the class and get the classID
          // if it doesn't, then display an error message
          
          console.log(data);
          // get data size without using data.length

          console.log("data size: ", Object.keys(data).length);
          console.log(classCode);
          console.log(studentName);
          // print the first item in the data array
          console.log(data.data[0].code);
          console.log(data.data[0].name);

          // loop through the data array and check if the classCode exists
          for (var i = 0; i < Object.keys(data).length + 1; i++) {
            console.log(data.data[i].code);
            if (data.data[i].code == classCode) {
              console.log("class exists");
              // get class id
              console.log(data.data[i]._id);
              // add student to class
              fetch ('http://localhost:3000/api/classroom/'+data.data[i]._id+'/student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    name: studentName,
                    code: classCode
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setShowJoined(true);

            })

            }
          }

              


        //     console.log('Success:', data);
        //     fetch ('http://localhost:3000/api/classroom/'+classCode+'/student', {
        //         method: 'POST',
        //         headers: {

        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             name: studentName,
        //             code: classCode
        //         })
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Success:', data);
        //         setShowJoined(true);
                
        //     })

        })
        .catch((error) => {
            console.error('Error:', error);
        });


    }
  
    return (
    <div className="container">
        <h1>Data Science Clicker</h1>
        <div className='Content'> 
          <form>
            <p> Join code:</p>
            <input onChange={ (e) => setClassCode(e.target.value)} type="text" name="name" maxLength={4}/>
            <p> NetID: </p> 
            <input  onChange={(e)=> setStudentName(e.target.value)} type="text" name="name"/>
            
              <div className='joinbutton' onClick={joinClass}>Join</div>
            
          </form> 
          { showJoined ? <p> You have successfully joined the class </p> : null}

        </div>
    </div>
    );
}

export default LandingPage;