import react from 'react';

const LandingPage = () => {
    return (
    <div className="LandingPage">
      
        <div className="Landing-form">
        <input style={{border: "2px solid #FE532D", marginBottom: '1vh'}} type="text" placeholder="Classroom Code" />

        <input style={ {border: "2px solid #FE532D", marginBottom: '1vh'} } type="text" placeholder="Name" />
        <button>Join</button>
        <br></br>
        <button onClick={() => window.location.href = '/createClass'}>Create Class</button>
        
        </div>
         
     
    </div>
    );
}

export default LandingPage;