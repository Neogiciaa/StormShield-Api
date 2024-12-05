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
    const {locationId, name, intensity} = req.body;
    try {
        const response = await connexion.query(
            `INSERT INTO Alert (locationId, name, intensity)
            VALUES (?, ?, ?)`, [locationId, name, intensity]
        );
        res.status(200).json({ data: locationId, name, intensity});
        } catch (error) {
        res.status(500).json({message: error.message});
    }

}

export const getAlerts = async (req, res) => {
    try {
        const getAlerts = await connexion.query(`SELECT * FROM Alert`)
        res.status(200).json(getAlerts[0]);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const saveLocationAndGetLocationId = async (req,res) => {
    try {
    const {lat, lon} = req.query;
    const [newLocation] = await connexion.query(`INSERT INTO Location (latitude, longitude) VALUES (?, ?)`, [lat, lon]);
    const newLocationId = newLocation.insertId;
    res.status(200).json({ data: newLocationId });
    return newLocationId;
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}