import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
  )
}

export default App
