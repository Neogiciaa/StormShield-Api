import axios from 'axios';

export const fetchWeatherData = async (lat, lon) => {
    const apiKey = process.env.OPENWEATHERMAP;

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`,
        {
            params: {
                lat: lat,
                lon: lon,
                units: 'metric',
                appid: apiKey
            }
        })

    return response.data;
};

export const fetchWeatherDataByCityName = async (cityName) => {
    const apiKey = process.env.OPENWEATHERMAP;
    const cityData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)

    const lat = cityData.data.coord.lat;
    const lon = cityData.data.coord.lon;

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);

    return response.data;
};

