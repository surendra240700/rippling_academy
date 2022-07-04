import {React,useState, useEffect, useContext}from 'react';
import '../App.css'
import { listItems } from './data';
import { SkeletonTheme } from 'react-loading-skeleton';
import * as Constants from '../constants/constants';
import 'react-dropdown/style.css'; 
import Dropdown from 'react-dropdown';
import {cartContext,cartCountContext} from './context';

function ShoppingItem(props){
  return (  
    <SkeletonTheme>
        <div className="shoppingItem">
            <div className='itemImage'>
                <img src={props.url} alt={props.description}></img>
            </div>
            <span className='name-container'>{props.name}</span> <br></br>
            <span className='price-container'> Price: ${props.price}</span> <br></br>
            <div className="ratings">
                <span>Rating: {props.rating.rate}{"("}{props.rating.count}{")"}</span>
            </div>
            <button onClick={e => {props.handleAddToCart(e)}} id={props.id}>Add to cart</button>
        </div>
    </SkeletonTheme> 
    );
}

function Home (){

    const [items, setItems] = useState(listItems);
    const [category,setCategory] = useState(Constants.ALL_CATEGORIES);
    const [minPrice,setMinPrice] = useState(Constants.DEFAULT_MIN_PRICE);
    const [maxPrice,setMaxPrice] = useState(Constants.DEFAULT_MAX_PRICE);
    const [sortParam,setSortParam] = useState(Constants.DEFAULT_SORT);
    const [cart, setCart] = useContext(cartContext);
    const [cartCount, setCartCount] = useContext(cartCountContext);
    // setCart();
    const categories = [...new Set(listItems.map(function(item) { return item.category; }))];
    categories.sort();
    categories.unshift(Constants.ALL_CATEGORIES);

    useEffect( () => {
        let temp = [...listItems];

        if(category!==Constants.ALL_CATEGORIES){
            temp = temp.filter( (item) => {
                return item.category===category;
            });
        }
        //Min and Max Price
        if(minPrice>0){
            temp = temp.filter( (item) => {
                return item.price>=minPrice;
            });
        }
        if(maxPrice>0){
            temp = temp.filter( (item) => {
                return item.price<=maxPrice;
            });
        }
        //sorting array
        if(sortParam===Constants.sortBy[0]){
            temp.sort((a,b) => {
                return a.title.localeCompare(b.title);
            });
        }
        else if(sortParam===Constants.sortBy[1]){
            temp.sort((a,b) => {
                return b.title.localeCompare(a.title);
            });
        }
        else if(sortParam===Constants.sortBy[2]){
            temp.sort((a,b) => {
                return a.price - b.price;
            });
        }
        else if(sortParam===Constants.sortBy[3]){
            temp.sort((a,b) => {
                return b.price - a.price;
            });
        }
        else if(sortParam===Constants.sortBy[4]){
            temp.sort((a,b) => {
                return b.rating.rate - a.rating.rate;
            });
        }
        setItems(temp);
        // console.log(temp);
    },[category,minPrice,maxPrice,sortParam]);

    const handleCategoryChange = (e) => {
        setCategory(e.value);
    }
    const handleMinPriceChange = (e) => {
        let val = parseFloat(e.target.value)
        if(val<=0){
            return;
        }
        setMinPrice(val);
    }
    const handleMaxPriceChange = (e) => {
        let val = parseFloat(e.target.value)
        if(val<=0){
            return;
        }
        setMaxPrice(val);
    }

    const handleSortChange = (e) => {
        setSortParam(e.value);
    }

    const handleAddToCart = (event) => {
        if(!event.isTrusted){
            return;
        }
        let newId = event.target.id;
        // console.log(event);
        const tempCart = [...cart];
        const checkAlreadyAdded = tempCart.find(item => newId === item.id);
        if(!checkAlreadyAdded){
            const newItems = {
                'id' : newId,
                'count' : 1
            }
            const newCart = [...cart, newItems];
            setCart(newCart);
        }
        else{
            checkAlreadyAdded['count']+=1;
            setCart(tempCart);
        }
        const temp = [...cartCount];
        temp[0]++;
        setCartCount(temp);
    }

    const categoriesFilterList = [];
    categories.forEach(function(cat) {
        let tempObj = {};
        tempObj.label = cat;
        tempObj.value = cat;
        categoriesFilterList.push(tempObj);
    });
    return (
    <div className='home'>
        <div className='filters'>
            <div>
                <Dropdown classname='dropDown sortFilter' options={Constants.sortBy} onChange={(e) => handleSortChange(e)} value={Constants.DEFAULT_SORT}/>
            </div>
            <div>
               <Dropdown classname='dropDown sortFilter' options={categories} onChange={(e) => handleCategoryChange(e)} value={categories[0]}/>
            </div>
            <div>
                <label>Min. Price<input type="number" placeholder='0' onChange={(e) => handleMinPriceChange(e)}></input></label>
            </div>
            <div>
                <label>Max. Price<input type="number" placeholder='0' onChange={(e) => handleMaxPriceChange(e)}></input></label>
            </div>
        </div>
        <div className='List'>
            {items.map( item => <ShoppingItem key={item.id} id = {item.id} name={item.title} price={item.price} 
                url={item.image} alt={item.description} rating= {item.rating}handleAddToCart= {handleAddToCart}/>)}
        </div>
    </div>
    );
}
 
export default Home;