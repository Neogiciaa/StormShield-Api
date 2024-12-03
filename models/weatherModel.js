import axios from 'axios';

export const fetchWeatherData = async () => {
    const apiKey = process.env.OPENWEATHERMAP;

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=62.0397&lon=129.7422&units=metric&appid=${apiKey}&units=metric`);
    return response.data;
};
