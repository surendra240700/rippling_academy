import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown'; 
import 'react-dropdown/style.css'; 
import './App.css'

const carList = [
  {
    name: "BMW M6",
    url:
      "https://mediapool.bmwgroup.com/cache/P9/201411/P90169551/P90169551-the-new-bmw-m6-coup-exterior-12-2014-600px.jpg",
    releaseYear: 2020
  },
  {
    name: "VW Polo",
    url:
      "https://cdn.euroncap.com/media/30740/volkswagen-polo-359-235.jpg?mode=crop&width=359&height=235",
    releaseYear: 2018
  },
  {
    name: "Audi S6",
    url:
      "https://www.motortrend.com/uploads/sites/5/2020/03/6-2020-audi-s6.jpg?fit=around%7C875:492.1875",
    releaseYear: 2020
  },
  {
    name: "BMW M2",
    url:
      "https://imgd.aeplcdn.com/0x0/cw/ec/37092/BMW-M2-Exterior-141054.jpg?wm=0",
    releaseYear: 2019
  },
  {
    name: "Audi A3",
    url: "https://cdn.motor1.com/images/mgl/BEooZ/s3/2021-audi-s3.jpg",
    releaseYear: 2019
  }
];

carList.forEach((car) => {car.brand = car.name.split(' ')[0];});
const brands = [...new Set(carList.map(function(car) { return car.brand; }))];
brands.push('All');
let temp = brands[0];
brands[0] = brands[brands.length-1];
brands[brands.length-1] = temp;
const years = [...new Set(carList.map(function(car) { return car.releaseYear; }))];
years.sort();

function Car(props) {
  return (  
  <div className="Car">
    <p className='text'> Name: {props.name}</p>
    <p className='text'> Year: {props.year}</p>
    <img src={props.url} alt='car' className='carImage'></img>
  </div>);
}

function App() {

  const [brand,setBrand] = useState('All');
  const [currYear,setYear] = useState('All');
  const [cars,setCars] = useState(carList);
  useEffect( () => {
    if(currYear!=='All' && brand!=='All')
      setCars(carList.filter((car)=>{ return car.brand===brand && car.releaseYear===currYear;}))
    else if(currYear!=='All')
      setCars(carList.filter((car)=>{ return car.releaseYear===currYear;}))
    else if(brand!=='All')
      setCars(carList.filter((car)=>{ return car.brand===brand;}))
    else
      setCars(carList);
  },[currYear,brand]);

  const handleBrandChange = (e) => {
      setBrand(e.value);
      console.log(setBrand);
      // updateCars();
  }
  const handleYearChange = (e) => {
    if(currYear===years[e.target.id]){
      setYear('All');
      document.getElementById(e.target.id).classList.remove('selected');
    }
    else{
      setYear(years[e.target.id]);
      document.getElementById(e.target.id).classList.add('selected');
      if(currYear!=='All'){
        let pastIndex = years.indexOf(currYear);
        document.getElementById(pastIndex).classList.remove('selected');
      }
    }
  }
  return (
    <div className="App">
      <div className='App-header'>
        <Dropdown classname='dropDown' options={brands} onChange={(e) => handleBrandChange(e)} value={brands[0]}/>
        <div className='yearFilter'>
          {years.map((val,index) => {
            return (<p className='year' key={index} id={index} onClick={(e) => handleYearChange(e)}> {val}</p>);
          })}
        </div>
      </div>
      <div className='List'>
        {cars.map((car,index) => <Car key={index} name={car.name} year={car.releaseYear} url={car.url}/>)}
      </div>
    </div>
  );
}

export default App;
