import axios from 'axios';

export const fetchWeatherData = async () => {
    const apiKey = process.env.OPENWEATHERMAP;

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=-22.9028&lon=-43.2075&units=metric&appid=${apiKey}&units=metric`);
    return response.data;
};
