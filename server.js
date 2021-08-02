'use strict';

const express = require('express');
const cors = require ('cors');
const weather = require('./data/weather.json');
const server = express();
server.use(cors());
require('dotenv').config();


const PORT = process.env.PORT;
// const PORT = 3000;



// http://localhost:3000/weather

server.get('/weather',(req,res)=>{

  let weatherData = weather.find(item =>{
    // console.log(weather);
    
    const lon = req.query.lon;
    const lat = req.query.lat;
    const searchQuery = req.query.searchQuery;
    if (item.city_name == searchQuery || item.lon == lon || item.lat == lat) {
      console.log(item.city_name);
      // return `${item.lon} , ${item.lat} , ${item.city_name} , ${item.data[2].weather.description}`;
      return item.city_name;
    //   return `${item.lon} , ${item.lat} , ${item.city_name} , ${item.data[2].weather.description} ${item.data[0].datetime,item.data[1].datetime,item.data[2].datetime}`;
    }else {
      return 'Error 404 Not Found';
    }
  });




  class Forecast {
    constructor(datetime,description) {

      this.date = datetime;
      this.description = description;
    }
  }
  let newArr = [];
  weatherData.data.map((item) => {


    newArr.push(new Forecast(item.datetime, `Low of ${item.low_temp} , high of ${item.high_temp} , with ${item.weather.description}`));
  });

  res.send(newArr);
    //   res.send(weatherData);


});

server.listen(PORT,()=>{

  console.log(`hello from server this is your port ${PORT}`);
  //   console.log(weather);
});

server.get('*', (req,res) => {
  res.status(404).send('page not found');
});

