import {fetchWeatherData} from '../models/weatherModel.js';

export const getWeatherDatas = async (req, res) => {
    try {
        const weatherData = await fetchWeatherData();
        res.status(200).json(weatherData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// C'est dans ce controller que l'on viendra appliquer des traitements sur nos datas, par ex les filtrer pour récupérer uniquement celles qui ont 12h en dt.txt :eyes:
