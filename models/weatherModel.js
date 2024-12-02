import axios from 'axios';

export const fetchWeatherData = async () => {
    const apiKey = process.env.OPENWEATHERMAP;
    const city = 'Paris';

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&units=metric`);
    return response.data;
};
