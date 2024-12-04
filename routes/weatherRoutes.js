import express from 'express';
import { getWeatherDatas } from '../controllers/weatherController.js';
import { fetchWeatherData } from '../models/weatherModel.js';
const router = express.Router();

// Route pour obtenir les alertes météo
router.get('/getWeatherDatas', getWeatherDatas);

router.get('/api/getWeatherDatas', (req, res) => {
    const latitude = req.query.lat;
    const longitude = req.query.lon;

    console.log(`Received coordinates: Latitude = ${latitude}, Longitude = ${longitude}`);

    // Exemple de réponse
    res.json({
        message: 'Coordinates received successfully',
        latitude,
        longitude,
    });
});

export default router;
