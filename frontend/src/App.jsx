import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx'; 
import Sweets from './components/Sweets.jsx';
import Navbar from './components/Navbar.jsx';
import { useEffect, useState } from 'react';
import AddSweet from './components/AddSweet.jsx';
import SweetsSearch from './components/SweetsSearch.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(()=>{
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true")
    setIsLoggedIn(loggedInStatus)  
  },[])

  return (
    <>
    <Router>
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sweets" element={<Sweets isAdmin={isAdmin}/>} />
        <Route path='/admin/add-sweet' element={<AddSweet/>} />
        <Route path='sweets/search' element={<SweetsSearch isAdmin={isAdmin}/>} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
