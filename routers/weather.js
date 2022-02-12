const router = require('express').Router();
const {createCurrent, getCurrentWeather} = require('../services/weather');
const auth = require('../middleware/authMiddleWere')

router.post('/create',auth, createCurrent)
// router.get('/get',auth, getCurrentWeather)

module.exports = router
