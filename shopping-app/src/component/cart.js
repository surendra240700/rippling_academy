import {React, useContext} from 'react'
import {cartContext,cartCountContext} from './context';
import { listItems } from './data';
import { SkeletonTheme } from 'react-loading-skeleton';
import '../App.css';

function CartItem(props) {
    const item = listItems[props.id-1];
    return (  
        <SkeletonTheme>
            <div className='cartItem'>
            <div>
                <img src={item.image} alt={item.description} className='itemImage'></img>
            </div>
            <p className='text'>{item.title}</p>
            <p className='text'> Price: ${item.price}</p>
            <p className='text'> {props.count}</p>
            <button onClick={props.addToCart} id={props.id}>+</button>
            <button onClick={props.removeFromCart} id={props.id}>-</button>
            </div>
        </SkeletonTheme> 
        );
}


function Cart() {
    const [cart,setCart] = useContext(cartContext);
    const [cartCount,setCartCount] = useContext(cartCountContext);

    function addToCart(event) {
        let newId = event.target.id;
        const tempCart = [...cart];
        const AddedItem = tempCart.find(addedItems => newId === addedItems.id);
        AddedItem['count']+=1;
        setCart(tempCart);
        const temp = [...cartCount];
        temp[0]++;
        setCartCount(temp);
    }

    function removeFromCart(event) {
        let newId = event.target.id;
        const tempCart = [...cart];
        const AddedItem = tempCart.find(addedItems => newId === addedItems.id);
        AddedItem['count']-=1;
        const updatedCart = tempCart.filter(item => item.count!==0);
        setCart(updatedCart);

        const temp = [...cartCount];
        temp[0]--;
        setCartCount(temp);
    }
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
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Add/Remove</span>
                </div>
            </div>
            {
                cart.map(item => <CartItem key={item.id} id={item.id} count={item.count}
                    addToCart={addToCart} removeFromCart={removeFromCart}/>)
            }

        </div>
    )
}

export default Cart;
