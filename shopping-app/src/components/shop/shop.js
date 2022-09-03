import { React, useState, useEffect, useContext } from 'react';
import { listItems } from '../data';
import * as Constants from '../constants/constants';
import Select from 'react-select';
import { cartContext, cartCountContext } from '../context';
import ShoppingItem from './shoppingItem';
import './shopping.css';

const categories = [
  ...new Set(
    listItems.map(function (item) {
      return item.category;
    })
  ),
];
categories.sort();
categories.unshift(Constants.ALL_CATEGORIES);

const categoriesFilterList = [];
categories.forEach(function (cat) {
  let tempObj = {};
  tempObj.label = cat;
  tempObj.value = cat;
  categoriesFilterList.push(tempObj);
});

const filterStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: '50px',
};
const sortFilterList = [];
Constants.sortBy.forEach(function (sortBy) {
  let tempObj = {};
  tempObj.label = sortBy;
  tempObj.value = sortBy;
  sortFilterList.push(tempObj);
});

function Shop() {
  const [items, setItems] = useState(listItems);
  const [category, setCategory] = useState(Constants.ALL_CATEGORIES);
  const [minPrice, setMinPrice] = useState(
    Constants.DEFAULT_MIN_PRICE
  );
  const [maxPrice, setMaxPrice] = useState(
    Constants.DEFAULT_MAX_PRICE
  );
  const [sortParam, setSortParam] = useState(Constants.DEFAULT_SORT);
  const [cart, setCart] = useContext(cartContext);
  const [cartCount, setCartCount] = useContext(cartCountContext);
  // setCart();

  useEffect(() => {
    let temp = [...listItems];

    if (category !== Constants.ALL_CATEGORIES) {
      temp = temp.filter((item) => {
        return item.category === category;
      });
    }
    //Min and Max Price
    if (minPrice > 0) {
      temp = temp.filter((item) => {
        return item.price >= minPrice;
      });
    }
    if (maxPrice > 0) {
      temp = temp.filter((item) => {
        return item.price <= maxPrice;
      });
    }
    //sorting array
    if (sortParam === Constants.sortBy[0]) {
      temp.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else if (sortParam === Constants.sortBy[1]) {
      temp.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    } else if (sortParam === Constants.sortBy[2]) {
      temp.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sortParam === Constants.sortBy[3]) {
      temp.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (sortParam === Constants.sortBy[4]) {
      temp.sort((a, b) => {
        return b.rating.rate - a.rating.rate;
      });
    }
    setItems(temp);
    // console.log(temp);
  }, [category, minPrice, maxPrice, sortParam]);

  const handleCategoryChange = (e) => {
    setCategory(e.value);
  };

  const handlePriceChange = (event) => {
    event.preventDefault();
    if (!event.isTrusted) return;
    let minVal = parseFloat(event.target[0].value);
    let maxVal = parseFloat(event.target[1].value);
    if (minVal >= 0) {
      setMinPrice(minVal);
    }
    if (maxVal >= 0) {
      setMaxPrice(maxVal);
    }
  };

  const handleSortChange = (e) => {
    setSortParam(e.value);
  };

  const handleAddToCart = (event) => {
    if (!event.isTrusted) {
      return;
    }
    let newId = event.target.id;
    // console.log(event);
    const tempCart = [...cart];
    const checkAlreadyAdded = tempCart.find(
      (item) => newId === item.id
    );
    if (!checkAlreadyAdded) {
      const newItems = {
        id: newId,
        count: 1,
      };
      const newCart = [...cart, newItems];
      setCart(newCart);
    } else {
      checkAlreadyAdded['count'] += 1;
      setCart(tempCart);
    }
    const temp = [...cartCount];
    temp[0]++;
    setCartCount(temp);
  };

  return (
    <div className="home">
      <div className="filters" style={filterStyle}>
        <div>
          <Select
            className="sortFilter"
            options={sortFilterList}
            onChange={(e) => handleSortChange(e)}
          />
        </div>
        <div>
          <Select
            className="sortFilter"
            options={categoriesFilterList}
            onChange={(e) => handleCategoryChange(e)}
          />
        </div>
        <div>
          <form className="formFilter" onSubmit={handlePriceChange}>
            <label>
              Min.<input type="number" placeholder="0"></input>
            </label>
            <label>
              Max.<input type="number" placeholder="0"></input>
            </label>
            <input
              className="applyButton applyButton1"
              type="submit"
              value="Apply"
            />
          </form>
        </div>
      </div>
      <div className="List">
        {items.map((item) => (
          <ShoppingItem
            key={item.id}
            id={item.id}
            name={item.title}
            price={item.price}
            url={item.image}
            alt={item.description}
            rating={item.rating}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
