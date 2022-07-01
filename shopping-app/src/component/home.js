import {React,useState} from 'react';
import '../App.css'
import { listItems } from './data';
import { SkeletonTheme } from 'react-loading-skeleton';
import * as Constants from '../constants/constants';
import 'react-dropdown/style.css'; 
// import MultiSelect from './checkbox';
import Multiselect from 'multiselect-react-dropdown';

import Dropdown from 'react-dropdown'; 

function ShoppingItem(props){
  return (  
    <SkeletonTheme>
        <div className="item">
        <img src={props.url} alt={props.description} className='itemImage'></img>
        <p className='text'>{props.name}</p>
        <p className='text'> Price: ${props.price}</p>
        </div>
    </SkeletonTheme> 
    );
}

function Home (){
    const sortBy = ['A-Z', 'Z-A', 'Price(Low to High)', 'Price(High to Low)'];

    const [items, setItems] = useState(listItems);
    const [cartItems, setCartItems] = useState([]);
    const [category,setCategory] = useState(Constants.ALL_CATEGORIES);
    const [minPrice,setMinPrice] = useState(Constants.DEFAULT_MIN_PRICE);
    const [maxPrice,setMaxPrice] = useState(Constants.DEFAULT_MAX_PRICE);
    const [sortParam,setSortParam] = useState(sortBy[0]);
    // fetch('https://fakestoreapi.com/products')
    //             .then(res=>res.json())
    //             .then(json=> {
    //                 console.log(json);
    //                 if(items===[])
    //                     setItems(json);
    //             });
    const categories = [...new Set(items.map(function(item) { return item.category; }))];
    categories.sort();
    // categories.unshift(Constants.ALL_CATEGORIES);
    
    const handleSortChange = (e) => {
        setSortParam(e.value);
        let temp = items;
        if(e.value==='A-Z'){
            temp.sort((a, b) => {
                a.title.localeCompare(b.title);
            });
        }
        else if(e.value==='Z-A'){
            temp.sort((a, b) => {
                b.title.localeCompare(a.title);
            });
        }
        else if(e.value==='Price(Low to High)'){
            temp.sort((a, b) => {
                return a.price - b.price;
            });
        }
        else if(e.value==='Price(High to Low)'){
            temp.sort((a, b) => {
                return b.price - a.price;
            });
        }
        setItems(temp);
    }
    const categoriesFilterList = [];
    // categories.forEach(function(cat,index) {
    //     let tempObj = {};
    //     tempObj.label = cat;
    //     tempObj.id = index;
    //     categoriesFilterList.push(tempObj);
    // });
    return (
    <div className='home'>
        <div className='filters'>
            {/* <MultiSelect options={categoriesFilterList}/> */}
            <Dropdown classname='dropDown' options={sortBy} onChange={(e) => handleSortChange(e)} value={sortBy[0]}/>
            <MultiSelect options={categoriesFilterList}/>
        </div>
        <div className='List'>
            {items.map( item => <ShoppingItem key={item.id} name={item.title} price={item.price} url={item.image} alt={item.description}/>)}
        </div>
    </div>
    );
}
 
export default Home;