const {Favorite} = require('../models');
const request = require('request');

const requestWeather = async (req, res) => {
  try {
    request(`${process.env.WEATHER_URL}data/2.5/forecast?q=${req.body.city}&appid=${process.env.API_KEY}`, async (err, res, body)=> {
      if (err) {
        return res.status(res.statusCode).json({message: 'Request Failed!'})
      }
      const weatherData = JSON.parse(body)
      const favoriteCityWeather = await Favorite.bulkCreate({
        // cityWeatherData:
      })

    })

  } catch (e) {
    return res.status(400).json({message: 'something went wrong!!'})
  }
}
