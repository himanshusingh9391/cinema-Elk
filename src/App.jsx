
import './App.css'
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Movie from './Components/Movie';
import Detail from './Components/Detail';
import {Routes,Route} from 'react-router-dom';


function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
