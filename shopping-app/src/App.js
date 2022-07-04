import { React, useState } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
// import { Navbar } from "react-bootstrap"
// import ThemeContext from './context/themeContext';
import Home from './component/home';
import Cart from './component/cart';
import {cartContext,cartCountContext} from './component/context';
import './App.css';


function App() {
  const cart = useState([]);
  const cartCount = useState([0]);

  return (
    // <ThemeContext.Provider value={'dark'}>
    <cartContext.Provider value={cart}>
    <cartCountContext.Provider value={cartCount}>
      <Router>
        <div className='App'>
          {/* <Navbar> */}
          <div className='header'>
            <ul className='navbar'>
              <li>
                <Link to="/">SHOP</Link>
              </li>
              <li>
                <Link to="/cart">cart </Link>
                <span>{'('}{cartCount[0]}{')'}</span>
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
    </cartCountContext.Provider>
    </cartContext.Provider>

);
}

export default App;