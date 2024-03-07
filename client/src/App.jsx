import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Home from './pages/Home';
import Header from './Component/Header/Header';

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App