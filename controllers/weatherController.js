import {fetchWeatherData} from '../models/weatherModel.js';

export const getWeatherDatas = async (req, res) => {
    try {
        const weatherData = await fetchWeatherData();
        const weatherDataFormatted = weatherData.list.filter(data => data.dt_txt.includes('12:00:00')).map(data => {
            return {
                date: data.dt_txt,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                cloud: data.clouds.all,
                wind: data.wind.speed,
                pressure: data.main.pressure,
                snow: data.snow,
                rain: data.rain,
            }
        });
        res.status(200).json(weatherDataFormatted);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// C'est dans ce controller que l'on viendra appliquer des traitements sur nos datas, par ex les filtrer pour récupérer uniquement celles qui ont 12h en dt.txt :eyes:
