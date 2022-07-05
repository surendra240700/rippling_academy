import { React, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Shop from './components/shop/shop';
import Cart from './components/cart/cart';
import { cartContext, cartCountContext } from './components/context';
import './App.css';
import './font-awesome-4.7.0/css/font-awesome.min.css';

function App() {
  const cart = useState([]);
  const cartCount = useState([0]);

  return (
    <div className="App">
      <cartContext.Provider value={cart}>
        <cartCountContext.Provider value={cartCount}>
          <Router>
            <div className="header">
              <ul className="navbar">
                <li>
                  <Link to="/">SHOP</Link>
                </li>
                <li className="cartIcon">
                  <Link to="/cart">
                    <i
                      className="fa fa-cart-arrow-down"
                      aria-hidden="true"
                    ></i>
                    <sup>{cartCount[0]}</sup>
                  </Link>
                </li>
              </ul>
            </div>
            <Routes>
              <Route exact path="/" element={<Shop />}></Route>
              <Route exact path="/cart" element={<Cart />}></Route>
            </Routes>
          </Router>
        </cartCountContext.Provider>
      </cartContext.Provider>
    </div>
  );
}

export default App;
