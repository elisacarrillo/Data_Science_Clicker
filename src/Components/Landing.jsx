import react from 'react';

const LandingPage = () => {
    return (
    <div className="App">
        <h1>Data Science Clicker</h1>
  
        <div className='Content'> 
          <form>
            <p> Join code:</p>
            <input type="text" name="name" maxLength={4}/>
            <p> NetID: </p> 
            <input type="text" name="name"/>
            <button className='joinbutton'> Join</button>
          </form> 
        </div>
    </div>
    );
}

export default LandingPage;