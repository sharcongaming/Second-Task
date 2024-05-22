import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './cmponent/Home';
import Register from './cmponent/Register';
import Login from './cmponent/Login';
import WalletCard from './cmponent/WalletCard';
import SignMessage from './cmponent/SignMessage';
import ErrorMessage from './cmponent/ErrorMessage';
import SuccessMessage from './cmponent/SuccessMessage';
import VerifyMessage from './cmponent/VerifyMessage ';


function App() {
  return (
    <div className="App">
      <h2>...... Welcome ......</h2>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/Wallet-card' element={<WalletCard/>}/>
      <Route className="flex flex-wrap"  exact path='/sign-message' element={<SignMessage/>}/>
      <Route exact path='/error-message' element={<ErrorMessage/>}/>
      <Route exact path='/succes-message' element={<SuccessMessage/>}/>
      <Route  className="w-full lg:w-1/2" exact path='/verify-message' element={<VerifyMessage/>}/>


      {/* <div className="flex flex-wrap">
      <div className="w-full lg:w-1/2">
        <SignMessage />
      </div>
      <div className="w-full lg:w-1/2">
        <VerifyMessage />
      </div> */}

      </Routes>
    </div>
  )
}

export default App;
