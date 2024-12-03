import { fetchWeatherData } from '../models/weatherModel.js';

export const getWeatherDatas = async (req, res) => {
    try {
        const { lat, lon } = await req.query;
        const weatherData = await fetchWeatherData(lat, lon);
        const weatherDataFormatted = weatherData.list.filter(data => data.dt_txt.includes('12:00:00')).map(data => {
            return {
                date: data.dt_txt,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                cloud: data.clouds.all,
                wind: data.wind.speed,
                pressure: data.main.pressure,
                snow: data.snow,
                rain: data.rain,
            }
        });
        res.status(200).json(weatherDataFormatted);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};