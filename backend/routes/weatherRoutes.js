const express = require('express');
const router = express.Router();
const { getCurrentWeather, getForecast } = require('../controllers/weatherController');

// GET request to /api/weather/current
router.get('/current', getCurrentWeather);

// GET request to /api/weather/forecast
router.get('/forecast', getForecast);

module.exports = router;
