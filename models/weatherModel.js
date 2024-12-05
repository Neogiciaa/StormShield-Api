import axios from 'axios';
import connexion from '../config/db';   

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


export async function saveLocationAndGetLocationId(lat, lon) {
    const newLocation = await connexion.query(`INSERT INTO Location (latitude, longitude) VALUES (?, ?)`, [lat, lon]);
    const newLocationId = newLocation.insertId;
    return newLocationId;
}