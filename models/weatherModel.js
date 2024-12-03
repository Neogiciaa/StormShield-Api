import axios from 'axios';

export const fetchWeatherData = async (lat, lon) => {
    const apiKey = process.env.OPENWEATHERMAP;

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=metric`);
    return response.data;
};
