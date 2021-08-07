const axios = require('axios');



// const weather = {};




function handleWeather(req , res) {

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


module.exports = handleWeather ;
