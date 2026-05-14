const axios = require('axios');

/**
 * @desc    Get current weather and generate smart alerts
 * @route   GET /api/weather/current
 * @access  Public (can be protected later)
 */
const getCurrentWeather = async (req, res) => {
    try {
        // You can pass city as a query param (e.g. ?city=Delhi) or use a default
        const city = req.query.city || 'Delhi';
        const apiKey = process.env.WEATHER_API_KEY;
        
        // OpenWeatherMap API URL
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        const response = await axios.get(url);
        const data = response.data;

        // Extract key weather variables
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherCondition = data.weather[0].main; // e.g., "Clear", "Rain"

        // Generate Smart Alerts
        const alerts = [];
        if (temp > 35) {
            alerts.push("⚠️ Heatwave warning: Ensure adequate irrigation for crops.");
        }
        if (temp < 4) {
            alerts.push("⚠️ Frost warning: Protect sensitive crops overnight.");
        }
        if (weatherCondition.toLowerCase().includes('rain') || weatherCondition.toLowerCase().includes('storm')) {
            alerts.push("⚠️ Heavy rain alert: Pause irrigation and check drainage.");
        }

        // Return formatted response
        res.json({
            city: data.name,
            temperature: temp,
            humidity: humidity,
            wind_speed: windSpeed,
            condition: weatherCondition,
            description: data.weather[0].description,
            smart_alerts: alerts
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching weather data', error: error.message });
    }
};

/**
 * @desc    Get 5-day weather forecast
 * @route   GET /api/weather/forecast
 * @access  Public
 */
const getForecast = async (req, res) => {
    try {
        const city = req.query.city || 'Delhi';
        const apiKey = process.env.WEATHER_API_KEY;
        
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        
        const response = await axios.get(url);
        
        // We return the raw forecast list (3-hour intervals for 5 days)
        // You can filter this later to just return one forecast per day if needed
        res.json({
            city: response.data.city.name,
            forecast: response.data.list.slice(0, 5) // Send only the next 5 intervals for simplicity
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching forecast data', error: error.message });
    }
};

module.exports = {
    getCurrentWeather,
    getForecast
};