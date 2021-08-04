'use strict';

require('dotenv').config();
const express = require('express');
const cors = require ('cors');
const server = express();
const axios = require('axios');


server.use(cors());
const PORT = process.env.PORT;
// const PORT = 3000;



// http://localhost:3000/weather?lat=31.95&lon=35.91&searchQuery=Amman

server.get('/weather',handleWeather);
server.get('*',(req,res) => res.status(404).send('page not found'));

async function handleWeather(req , res) {
  
  const searchQuery = req.query.q;
  const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&key=3902269bf7bd418ebca1280b080fb6ef&lat=48.8588897&lon=2.3200410217200766`
  const weatherData = weather.find(item =>item.city_name.toLowerCase() === searchQuery.toLowerCase());
  console.log(searchQuery);
  if (weatherData !== undefined)
  {
    const weatherArr = weatherData.data.map(items => new Forecast(items));
    res.status(200).send(weatherArr);
  }
  else {
    res.status(500).send('You have error for today');

  }
  
}
function Forecast(items) {
 
    this.dateTime =items.datetime;
    this.description = items.weather.description;
}


server.listen(PORT,()=>

  console.log(`hello from server this is your port ${PORT}`));




