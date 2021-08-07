'use strict';


const axios = require('axios');


// const movies = {};

function handleMovie(req , res) {

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






module.exports = handleMovie;
