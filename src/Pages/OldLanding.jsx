import react from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';


const LandingPage = () => {
  const [classCode, setClassCode] = useState("");
  const [studentName, setStudentName] = useState("");
  const [showJoined, setShowJoined] = useState(false);
  const [dataSize, setDataSize] = useState(0);

    const joinClass = async () => {
        console.log("Join Class");
        fetch('http://localhost:3000/api/classroom/' + classCode + '/student', {
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
            // navigate to /classroom
            window.location.href="/joined/"+classCode;
            
        }
        )
        .catch((error) => {
            console.error('Error:', error);
        }
        );

        


    }
  
    return (
    <div className="container">
        <h1>Data Science Clicker</h1>
        <div className='Content'> 
          <form>
            <p> Join code:</p>
            <input onChange={ (e) => setClassCode(e.target.value) && console.log(classCode)} type="text" name="name" maxLength={4}/>
            <p> NetID: </p> 
            <input  onChange={(e)=> setStudentName(e.target.value) && console.log(studentName)} type="text" name="name"/>
            
              <div className='joinbutton' onClick={joinClass}>Join</div>
            
          </form> 
          { showJoined ? <p> You have successfully joined the class </p> : null}

        </div>
    </div>
    );
}

export default LandingPage;