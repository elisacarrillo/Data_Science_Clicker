import React from 'react';
import './Classroom.css'


const numChoices = (numButtons) => {
    const buttons = [];
    
    for (let i = 0; i < numButtons; i++) {
      const label = String.fromCharCode(65 + i);
      buttons.push(<button key={label} className='MCbutton'>{label}</button>);
    }
    
    return <div className='buttoncontainer'>{buttons}</div>;
  }


const Classroom = () => {

  return (
    
    <div className="classroom">
      <div className='topbox'> 
        <h1> Classroom A</h1>
        <h1> Room: PSPA</h1>
      </div>
      
      <div className='contentbox'>
        <div className='statbox'>
          <h1> Your Grade</h1>
          
          <div className='pichart'></div> 
        </div>
        <div className='questionbox'>
          <h1> Live Question</h1>
          <div className='question'>
            <h1> How many States are in the United States of America? </h1>
          </div>
          {numChoices(5)}
        </div>
      </div>
    </div>
  );
}


export default Classroom;
