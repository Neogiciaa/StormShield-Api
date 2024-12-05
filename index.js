import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import weatherRoutes from './routes/weatherRoutes.js';
import geoFencingRoutes from "./routes/geoFencingRoutes.js";

dotenv.config();

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(cors());
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});

// Middleware pour parser le body des requêtes en JSON et accéder au req.body
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('StormShield backend is running!');
});

// Utilisation des routes définies dans weatherRoutes.js
app.use('/api', weatherRoutes);

// Utilisation des routes définies dans geoFencingRoutes.js
app.use('/api', geoFencingRoutes);
