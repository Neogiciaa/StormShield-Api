import express from 'express';
import { getWeatherDatas } from '../controllers/weatherController.js';

const router = express.Router();

// Route pour obtenir les alertes météo
router.get('/getWeatherDatas', getWeatherDatas);

export default router;