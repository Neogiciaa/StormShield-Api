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

export const createAlert = async (req, res) => {
    const {locationId, description, intensity} = req.body;
    try {
        const response = await connexion.query(
            `INSERT INTO Alert (locationId, name, intensity)
            VALUES (?, ?, ?)`, [newLocationId, 'Test Alert', weatherData.pressure]
        );
        res.status(200).json({ data: locationId, description, intensity});
        } catch(error) {
        res.status(500).json({message: error.message});
    }

}