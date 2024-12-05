import express from "express";
import {getWeatherDatas} from "../controllers/weatherController.js";
import {createAlert, createLocation, createWarningAlert, getAllWarningAlert} from "../models/warningModel.js";

const router = express.Router();

router.get("/getWeatherDatas", getWeatherDatas);
router.post('/createWarningAlert', createWarningAlert);
router.get('/getAllWarningAlert', getAllWarningAlert);
router.post('/createAlert', createAlert);
router.post('/createLocation', createLocation);

export default router;