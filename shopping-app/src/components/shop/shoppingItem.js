import { React } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import './shopping.css';
import '../../font-awesome-4.7.0/css/font-awesome.min.css';

function ShoppingItem(props) {
  return (
    <SkeletonTheme>
      <div className="shoppingItem">
        <div className="itemImage">
          <img src={props.url} alt={props.description}></img>
        </div>
        <div className="itemText">
          <span>{props.name}</span> <br></br>
          <span>${props.price}</span>
          <div className="ratings">
            <span>
              Rating: {props.rating.rate}
              {'('}
              {props.rating.count}
              {')'}
            </span>
          </div>
          <button
            className="button button1"
            onClick={(e) => {
              props.handleAddToCart(e);
            }}
            id={props.id}
          >
            <i className="fa fa-cart-plus" aria-hidden="true"></i>
            Add to cart
          </button>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default ShoppingItem;
