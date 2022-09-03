import { React, useContext } from 'react';
import { cartContext, cartCountContext } from '../context';
import './cart.css';
import CartItem from './cartitem';

function Cart() {
  const [cart, setCart] = useContext(cartContext);
  const [cartCount, setCartCount] = useContext(cartCountContext);

  function addToCart(event) {
    let newId = event.target.id;
    const tempCart = [...cart];
    const AddedItem = tempCart.find(
      (addedItems) => newId === addedItems.id
    );
    AddedItem['count'] += 1;
    setCart(tempCart);
    const temp = [...cartCount];
    temp[0]++;
    setCartCount(temp);
  }

  function removeFromCart(event) {
    let newId = event.target.id;
    const tempCart = [...cart];
    const AddedItem = tempCart.find(
      (addedItems) => newId === addedItems.id
    );
    AddedItem['count'] -= 1;
    const updatedCart = tempCart.filter((item) => item.count !== 0);
    setCart(updatedCart);

    const temp = [...cartCount];
    temp[0]--;
    setCartCount(temp);
  }
  return (
    <div className="checkoutPage">
      <div className="checkoutHeader">
        <div className="headerBlock">
          <span>Products</span>
        </div>
        <div className="headerBlock">
          <span>Description</span>
        </div>
        <div className="numericalHeader">
          <span>Price</span>
        </div>
        <div className="numericalHeader">
          <span>Quantity</span>
        </div>
        <div className="numericalHeader">
          <span>Add/Remove</span>
        </div>
      </div>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          count={item.count}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
    </div>
  );
}

export default Cart;
