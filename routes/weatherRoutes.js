import express from 'express';
import { getWeatherDatas, getWeatherDatasByCityName } from '../controllers/weatherController.js';
const router = express.Router();

// Route pour obtenir les alertes météo
router.get('/getWeatherDatas', getWeatherDatas);

router.get('/getWeatherDatasByCityName', getWeatherDatasByCityName);

export default router;
