import React from 'react';
import './Classroom.css';
import { useState } from 'react';
import { useEffect } from 'react';


const numChoices = (numButtons) => {
    const buttons = [];
    
    for (let i = 0; i < numButtons; i++) {
      const label = String.fromCharCode(65 + i);
      buttons.push(<button key={label} className='MCbutton'>{label}</button>);
    }
    
    return <div className='buttoncontainer'>{buttons}</div>;
  }


const Classroom = () => {
  const [classCode, setClassCode] = useState("");
  const [question, setQuestion] = useState("Why is Elisa so cool?");
  const [questionType, setQuestionType] = useState(3);
  const [answer, setAnswer] = useState(0);
  const [choices, setChoices] = useState(["A", "B", "C", "D"]);
  const [correctChoice, setCorrectChoice] = useState(0);


  const getClassCode = () => {
    console.log("Get Class Code");
    // get class code from url
    var url = window.location.href;
    var classCode = url.substring(url.lastIndexOf('/') + 1);
    setClassCode(classCode);
    console.log(classCode);
  }

  const getQuestion = () => {
    console.log("Get Question");
    // get question from database
   fetch ('http://localhost:3001/api/question/'+classCode, {

    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    setQuestion(data.question);
    setQuestionType(data.type);
    if (data.type == 0) {
      setAnswer(data.answer);
    }
    if (data.type == 1) {
      setChoices(data.choices);
      setCorrectChoice(data.correctChoice);
    }
  })
  .catch((error) => {

    console.error('Error:', error);
  });
  }
    


  useEffect(() => {
    getClassCode();
  }, []);

  return (
    
    <div className="classroom">
      <div className='topbox'> 
        <h1> Classroom A</h1>
        <h1> Room: {classCode}</h1>
      </div>
      
      <div className='contentbox'>
        <div className='statbox'>
          <h1> Your Grade</h1>
          
          {/* <div className='pichart'></div>  */}
        </div>
        <div className='questionbox'>
          <h1> Live Question</h1>
          <div className='question'>
            <h1> { question} </h1>
          </div>
          {numChoices(5)}
        </div>
      </div>
    </div>
  );
}


export default Classroom;
