import express from 'express';
import {
    createDangerZone,
    deleteSubscriptionById,
    getAllSubscriptions,
    getOneSubscriptionById
} from "../models/geoFencingModel.js";

const router = express.Router();

router.post('/createDangerZone', createDangerZone);

router.get('/getAllSubscriptions', getAllSubscriptions);

router.get('/getOneSubscriptionById', getOneSubscriptionById);

router.delete('/deleteSubscriptionById', deleteSubscriptionById);

export default router;
