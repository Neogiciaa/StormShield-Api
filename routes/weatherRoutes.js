import express from 'express';
import {getWeatherDatas} from '../controllers/weatherController.js';
import {createWarningAlert} from "../controllers/warningController.js";

const router = express.Router();

// Route pour obtenir les alertes météo
router.get('/getWeatherDatas', getWeatherDatas);

router.post('/create', createWarningAlert);

export default router;
