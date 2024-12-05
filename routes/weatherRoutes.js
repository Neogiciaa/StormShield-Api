import express from 'express';
import {getWeatherDatas,} from '../controllers/weatherController.js';
import {createAlert, getAlerts, saveLocationAndGetLocationId} from "../models/weatherModel.js";
import {createWarningAlert, getAllWarningAlert} from "../models/warningModel.js";

const router = express.Router();

router.get("/getWeatherDatas", getWeatherDatas);
router.post('/createWarningAlert', createWarningAlert);
router.get('/getAllWarningAlert', getAllWarningAlert);
router.post('/getLocation', saveLocationAndGetLocationId);
router.get('/getAlerts', getAlerts);

export default router;
