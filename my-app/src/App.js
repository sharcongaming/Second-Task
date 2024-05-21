import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './cmponent/Home';
import Register from './cmponent/Register';
import Login from './cmponent/Login';

function App() {
  return (
    <div className="App">
      <h2>...... Welcome ......</h2>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/login' element={<Login/>}/>


      </Routes>
    </div>
  )
}

export default App;
