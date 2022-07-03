import { React, createContext, useContext, useState } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
// import { Navbar } from "react-bootstrap"
// import ThemeContext from './context/themeContext';
import Home from './component/home';
import Cart from './component/cart';
import cartContext from './component/context';
import './App.css';


function App() {
  const cart = useState([]);

  return (
    // <ThemeContext.Provider value={'dark'}>
    <cartContext.Provider value={cart}>
      <Router>
        <div className='App'>
          {/* <Navbar> */}
          <div className='navigation'>
            <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">cart</Link>
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
    </cartContext.Provider>

);
}

export default App;