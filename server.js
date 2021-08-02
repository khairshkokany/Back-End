'use strict';

const express = require('express');

const weather = require('./data/weather.json');

// const PORT = process.env.PORT;
const PORT = 3000;

const server = express();


// http://localhost:3000/weather

server.get('/weather',(req,res)=>{

  let weatherData = weather.map(item =>{
    console.log(weather);
    // const lon = req.query.lon;
    // const lat = req.query.lat;
    const searchQuery = req.query.city_name;
    // if (item.searchQuery === item.city_name) {
      console.log(searchQuery);
        // return `${item.lon} , ${item.lat} , ${item.city_name} , ${item.data[2].weather.description}`;
      return `${item.lon} , ${item.lat} , ${item.city_name} , ${item.data[2].weather.description} ${item.data[0].valid_date}`;
    // }else {
    //   return 'Error 404 Not Found';
    // }
  });

  res.send(weatherData);
});

server.listen(PORT,()=>{

  console.log(`hello from server this is your port ${PORT}`);
//   console.log(weather);
});
