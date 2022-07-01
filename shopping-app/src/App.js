import { React, createContext, useContext, useState } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
// import { Navbar } from "react-bootstrap"
// import ThemeContext from './context/themeContext';
import Home from './component/home';
import Cart from './component/cart';
import './App.css';




function App() {
  return (
    // <ThemeContext.Provider value={'dark'}>
      <Router>
        <div className='App'>
          {/* <Navbar> */}
          <div className='navigation'>
            <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">About Us</Link>
            </li>
            </ul>
          <Routes>
              <Route exact path='/' element={< Home />}></Route>
              <Route exact path='/cart' element={< Cart />}></Route>
          </Routes>
          {/* </Navbar> */}
          </div>
        </div>
      </Router>
  // </ThemeContext.Provider>

);
}

export default App;