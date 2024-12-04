import express from 'express';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;


app.use(cors());

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});

// Middleware pour parser le body des requêtes en JSON et accéder au req.body
app.use(express.json());


app.get('/', (req, res) => {
    res.send('StormShield backend is running!');
});

// Utilisation des routes définies dans weatherRoutes.js
app.use('/api', weatherRoutes);



