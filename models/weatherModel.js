import axios from 'axios';
import connexion from '../DataBaseConfig.js';

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

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);

    return { data: response.data, coords: { lat, lon } };
};


export const createAlert = async (locationId, name, intensity) => {
    try {
        await connexion.query(
            `INSERT INTO Alert (locationId, name, intensity)
             VALUES (?, ?, ?)`, [locationId, name, intensity]
        );

    } catch (error) {
        console.error(error.message);
    }
}

export const saveLocationAndGetLocationId = async (lat, lon) => {
    try {
        const [newLocation] = await connexion.query(
            `INSERT INTO Location (latitude, longitude)
             VALUES (?, ?)`, [lat, lon]);

        return newLocation.insertId;
    } catch (error) {
        console.error(error.message);
    }
}

export const getAlerts = async (req, res) => {
    try {
        const getAlerts = await connexion.query(`SELECT *
                                                 FROM Alert`)
        res.status(200).json(getAlerts[0]);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
