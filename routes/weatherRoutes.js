import express from 'express';
import { getWeatherDatas } from '../controllers/weatherController.js';
import { saveLocationAndGetLocationId } from '../models/weatherModel.js';


const router = express.Router();

// Route pour obtenir les alertes météo
router.get('/getWeatherDatas', getWeatherDatas);

router.post('/saveLocation', saveLocationAndGetLocationId);



export default router;
