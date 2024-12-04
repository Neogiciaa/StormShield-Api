import express from 'express';
import { getWeatherDatas, saveLocation } from '../controllers/weatherController.js';


const router = express.Router();

// Route pour obtenir les alertes météo
router.get('/getWeatherDatas', getWeatherDatas);

router.post('/saveLocation', saveLocation);



export default router;
