'use strict';

const express = require('express');
const cors = require ('cors');
const axios = require('axios');
// const weather = require('./data/weather.json');
const server = express();
server.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;


// http://localhost:3000/weather?lat=31.95&lon=35.91&searchQuery=Amman
// const PORT = 3000;


server.get('/weather',handleWeather);
server.get('/movies',handleMovie);




async function handleMovie(req , res) {

  const searchQuery = req.query.query;
  // const URLMovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;

  const URLMovie =`https://api.themoviedb.org/3/search/movie?api_key=0233c982f62b7d9615af3d46f9f923cf&query=${searchQuery}`;

  // http://api.themoviedb.org/3/search/movie?api_key=4a71d7a66dd2ac2d5c1ce5f254058973&query=amman

  axios
    .get(URLMovie)
    .then(item => {

      let moviesArr = item.data.results;
      console.log(item.data.results);
      res.send(moviesList(moviesArr));
      console.log(moviesArr);
      console.log('hello');
    })

    .catch (error => {
      res.send(error);

    });
}

const moviesList = (moviesArr) =>{

  const moviesObject = [];

  moviesArr.map (item =>{

    const title = item.title;
    const overview = item.overview;
    const vote_average = item.vote_average;
    const vote_count = item.vote_count;
    const poster_path = process.env.IMG+item.poster_path;
    const popularity = item.popularity;
    const release_data = item.release_data;

    moviesObject.push(new Movies(title,overview,vote_average,vote_count,poster_path,popularity,release_data));


  });
  console.log(moviesObject);
  return moviesObject;
};

class Movies {
  constructor(title,overview,vote_average,vote_count,poster_path,popularity,release_data){

    this.title = title;
    this.overview = overview;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.poster_path = poster_path;
    this.popularity = popularity;
    this.release_data = release_data;

  }
}




async function handleWeather(req , res) {

  let searchQuery = req.query.q;
  let lat = req.query.lat;
  let lon = req.query.lon;
  const URL = `https://api.weatherbit.io/v2.0/forecast/daily?q=${searchQuery}&key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;


  axios
    .get(URL)
    .then(item =>{
      let weatherArr = item.data.data;
      res.send(weatherList(weatherArr));
      console.log(weatherArr);
    })

    .catch(error =>{
      res.send(error);
    });

}

const weatherList = (weatherObj) => {

  const weatherObject = [];

  weatherObj.map(item =>{

    const description = item.weather.description;
    const dateTime = item.datetime;
    weatherObject.push(new Forecast(description,dateTime));
  });
  return weatherObject;

};

class Forecast {

  constructor(dataTime,description){

    this.dateTime = dataTime;
    this.description = description;
  }
}



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




