import { React } from 'react';
import { listItems } from '../data';
import { SkeletonTheme } from 'react-loading-skeleton';
import './cart.css';

function CartItem(props) {
  const item = listItems[props.id - 1];
  return (
    <SkeletonTheme>
      <div className="cartItem">
        <div className="cartImage headerBlock">
          <img
            src={item.image}
            alt={item.description}
            className="cartImage"
          ></img>
        </div>
        <div className="headerBlock descriptionBlock">
          <span>{item.description}</span>
        </div>
        <div className="numericalHeader">
          <p> ${item.price}</p>
        </div>
        <div className="numericalHeader">
          <p> {props.count}</p>
        </div>
        <div className="numericalHeader">
          <button onClick={props.addToCart} id={props.id}>
            +
          </button>
          <button onClick={props.removeFromCart} id={props.id}>
            -
          </button>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default CartItem;
