import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './components/About'
import NavBar from './components/NavBar'
import Users from './components/Users'

function App() {
  return (
    <Router>
      <NavBar />
      <div className='container p-4'>
        <Routes>
          <Route exact path='/' element={<Users />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

