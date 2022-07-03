import {React, useContext} from 'react'
import cartContext from './context';
import { listItems } from './data';
import { SkeletonTheme } from 'react-loading-skeleton';

function CartItem(props) {
    const item = listItems[props.id-1];
    return (  
        <SkeletonTheme>
            <div className="item">
            <div>
                <img src={item.image} alt={item.description} className='itemImage'></img>
            </div>
            <p className='text'>{item.title}</p>
            <p className='text'> Price: ${item.price}</p>
            <p className='text'> Count: {item.count}</p>
            </div>
        </SkeletonTheme> 
        );
}

function Cart() {
    const [cart,setCart] = useContext(cartContext);
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Products</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>

            {
                cart.map(item => <CartItem key={item.id} id={item.id} count={item.count} />)
            }
            <div className="total">
                {/* <span>Total= ${total}</span> */}
            </div>
            <div className="test-warning">
                Please use any data for address and name and email, also use <br />
                card number: 4242 4242 4242 4242, expiry: 02/22, cvv: 123 for dummy payment
            </div>
            {/* <StripeButton price={total} /> */}
        </div>
    )
}

export default Cart;
