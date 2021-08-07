const axios = require('axios');



const weather = {};

const memory = {};


weather.handleWeather = async function(req , res) {

  let searchQuery = req.query.q;
  let lat = req.query.lat;
  let lon = req.query.lon;

  if (memory[searchQuery] !== undefined) {

    console.log('get data error ');
    res.send(memory[searchQuery]);

  }
  else {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?q=${searchQuery}&key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;


    axios
      .get(URL)
      .then(item =>{
        let weatherArr = item.data.data;
        res.send(weather.weatherList(weatherArr));
        console.log(weatherArr);
      })

      .catch(error =>{
        res.send(error);
      });











    weather.weatherList = (weatherObj) => {

      const weatherObject = [];

      weatherObj.map(item =>{

        const description = item.weather.description;
        const dateTime = item.datetime;
        weatherObject.push(new Forecast(description,dateTime));
      });
      return weatherObject;

    };

  }

};


class Forecast {

  constructor(dataTime,description){

    this.dateTime = dataTime;
    this.description = description;
  }
}


module.exports = weather ;
