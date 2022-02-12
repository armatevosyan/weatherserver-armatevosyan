const {Weather} = require('../models');
const request = require('request')
const {Op} = require("sequelize");
require('dotenv').config()

const createCurrent = async (req, res) => {
  try {
    const data =  req.body;
    request(`${process.env.WEATHER_URL}data/2.5/weather?lat=${data.lat}&lon=${data.lon}&units=${data.units}&appid=${process.env.API_KEY}`, async(error, response, body) => {
    if (error) {

    }
      if(!body) {
        return res.status(400).json({message: 'Weather data is not defined'})
      }
      const data = JSON.parse(body)
      const weather = await Weather.create({
        cityName:  data.name,
        cityDt: data.dt,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
        maxTemp: data.main.temp_max,
        minTemp: data.main. temp_min,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        windSpeed: data.wind.speed,
        currentCityId: data.weather[0].id
      })

      await Weather.destroy({where: {
        cityDt: {
          [Op.lt]: data.dt,
        }
        }});

      return res.status(200).json({weather});


    })

  } catch (e) {
    return res.status(400).json({message: 'Something went wrong!'})
  }
}

// const getCurrentWeather = async (res, req) => {
//   try {
//       const weather = await Weather.findAll()
//     if(!weather) {
//       return res.status(400).json({message: 'weather data not defined'})
//     }
//     if(new Date(weather.dt).getMinutes() - new Date(weather.dt).getMinutes() === ) {
//
//     }
//   } catch (e) {
//     return res.status(400).json({message: 'something went wrong'})
//   }
// }


module.exports = {
  createCurrent,
  // getCurrentWeather
}
