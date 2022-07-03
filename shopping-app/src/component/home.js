import {React,useState, useEffect, useContext}from 'react';
import '../App.css'
import { listItems } from './data';
import { SkeletonTheme } from 'react-loading-skeleton';
import * as Constants from '../constants/constants';
import 'react-dropdown/style.css'; 
import Dropdown from 'react-dropdown';
import cartContext from './context';

function ShoppingItem(props){
  return (  
    <SkeletonTheme>
        <div className="item">
        <div>
            <img src={props.url} alt={props.description} className='itemImage'></img>
        </div>
        <p className='text'>{props.name}</p>
        <p className='text'> Price: ${props.price}</p>
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
    // setCart();
    const categories = [...new Set(items.map(function(item) { return item.category; }))];
    categories.sort();
    categories.unshift(Constants.ALL_CATEGORIES);

    useEffect( () => {
        let temp = [...listItems];
        if(category!==Constants.ALL_CATEGORIES && (minPrice<=maxPrice && maxPrice!==0)){
            temp = temp.filter( (item) => {
                return item.category===category && minPrice<=item.price && maxPrice>=item.price;
            });
        }
        else if(category!==Constants.ALL_CATEGORIES){
            temp = temp.filter( (item) => {
                return item.category===category;
            });
        }
        else if(minPrice<=maxPrice && maxPrice!==0){
            console.log("HI");
            temp = temp.filter( (item) => {
                return minPrice<=item.price && maxPrice>=item.price;
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
        setItems(temp);
        // console.log(temp);
    },[category,minPrice,maxPrice,sortParam]);

    const handleCategoryChange = (e) => {
        setCategory(e.value);
    }
    const handleMinPriceChange = (e) => {
        if(minPrice<0){
            return;
        }
        setMinPrice(e.value);
    }
    const handleMaxPriceChange = (e) => {
        if(maxPrice<0){
            return;
        }
        setMaxPrice(e.value);
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
        if(cart.length==0){
            const addedItems = {
                'id' : newId,
                'count' : 1
            }
            const newCart = [...cart, addedItems];
            setCart(newCart);         
        }
        const checkAlreadyAdded = cart.find(addedItems => newId === addedItems.id);
        if(!checkAlreadyAdded){
            const addedItems = {
                'id' : newId,
                'count' : 1
            }
            const newCart = [...cart, addedItems];
            setCart(newCart);
        }
        else{
            checkAlreadyAdded['count']+=1;
            const updatedCart = [...cart];
            setCart(updatedCart);
        }
        console.log(cart);
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
            <Dropdown classname='dropDown sortFilter' options={Constants.sortBy} onChange={(e) => handleSortChange(e)} value={Constants.DEFAULT_SORT}/>
            <Dropdown classname='dropDown sortFilter' options={categories} onChange={(e) => handleCategoryChange(e)} value={Constants.ALL_CATEGORIES}/>
            {/* <Select options={categoriesFilterList} /> */}
            <label>Min. Price<input type="number" placeholder='0' onChange={(e) => handleMinPriceChange(e)}></input></label>
            <label>Max. Price<input type="number" placeholder='0' onChange={(e) => handleMaxPriceChange(e)}></input></label>
        </div>
        <div className='List'>
            {items.map( item => <ShoppingItem key={item.id} id = {item.id} name={item.title} price={item.price} 
                url={item.image} alt={item.description} handleAddToCart= {handleAddToCart}/>)}
        </div>
    </div>
    );
}
 
export default Home;