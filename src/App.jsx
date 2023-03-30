import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

import LandingPage from './Components/Landing';
import CreateClass from './Components/CreateClass';
import Classroom from './Components/Classroom';

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/createClass" element={<CreateClass />} />
        <Route path="/join" element = {<Classroom />} /> 
      </Routes>
    </Router>

  )
}

export default App
