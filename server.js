'use strict';
const express = require('express');
const cors = require ('cors');
// const axios = require('axios');
// const weather = require('./data/weather.json');
const server = express();
server.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;


// http://localhost:3000/weather?lat=31.95&lon=35.91&searchQuery=Amman
// const PORT = 3000;

const Weather = require('./Weather');
const Movies = require('./Movies');

server.get('/weather',Weather);
server.get('/movies',Movies);









//     const weatherData = weather.find(item =>item.city_name.toLowerCase() === searchQuery.toLowerCase());
//     console.log(searchQuery);
//     if (weatherData !== undefined)
//     {
//       const weatherArr = weatherData.data.map(items => new Forecast(items));
//       res.status(200).send(weatherArr);
//     }
//     else {
//       res.status(500).send('You have error for today');

//     }

//   }

//   const weatherData = weather.find(item =>item.city_name.toLowerCase() === searchQuery.toLowerCase());
//   console.log(searchQuery);
//   if (weatherData !== undefined)
//   {
//     const weatherArr = weatherData.data.map(items => new Forecast(items));
//     res.status(200).send(weatherArr);
//   }
//   else {
//     res.status(500).send('You have error for today');

//   }

// }





// function Forecast(items) {

//   this.dateTime =items.datetime;
//   this.description = items.weather.description;
// }

server.get('*',(req,res) => res.status(404).send('page not found'));

server.listen(PORT,()=>

  console.log(`hello from server this is your port ${PORT}`));




