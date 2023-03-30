import react from 'react';
import { Link } from 'react-router-dom'


const LandingPage = () => {

  
    return (
    <div className="container">
        <h1>Data Science Clicker</h1>
        <div className='Content'> 
          <form>
            <p> Join code:</p>
            <input type="text" name="name" maxLength={4}/>
            <p> NetID: </p> 
            <input type="text" name="name"/>
            <Link to="/join">
              <button className='joinbutton'>Join</button>
            </Link> 
          </form> 
        </div>
    </div>
    );
}

export default LandingPage;