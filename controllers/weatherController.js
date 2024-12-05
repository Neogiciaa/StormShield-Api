import {fetchWeatherData} from '../models/weatherModel.js';

// Add snow params !!!IMPORTANT
const alerts = {
    'flood': {
        'moderate': { 
            'rain': { min: 11, max: 30 }, // Moderate rain (orange)
            'pressure': { max: 1014, min: 1005 } // Low pressure (orange)
        },
        'high': { 
            'rain': { min: 31 }, // Heavy rain (red or extreme-red)
            'pressure': { max: 1004 } // Very low pressure (red or extreme-red)
        }
    },
    'storm': {
        'moderate': { 
            'wind': { min: (51/3.6), max: (80/3.6)}, // Strong wind (orange)
            'pressure': { max: 1014, min: 1005 } // Low pressure (orange)
        },
        'high': { 
            'wind': { min: (81/3.6) }, // Very strong wind (red or extreme-red)
            'pressure': { max: 1004 } // Very low pressure (red or extreme-red)
        }
    },
    'ice-risk': {
        'moderate': { 
            'temperature': { max: 0, min: -5 }, // Freezing to slightly below freezing
            'rain': { min: 11, max: 30 } // Moderate rain (orange)
        },
        'high': { 
            'temperature': { max: -6 }, // Very cold temperatures
            'rain': { min: 31 } // Heavy rain (red or extreme-red)
        }
    },
    'strong-wind': {
        'moderate': { 
            'wind': { min: (51/3.6), max: (80/3.6) } // Strong wind (orange)
        },
        'high': { 
            'wind': { min: (81/3.6) } // Very strong wind (red or extreme-red)
        }
    },
    'extreme-heat': {
        'moderate': { 
            'temperature': { min: 31, max: 35 }, // Hot (red)
            'pressure': { min: 1026, max: 1040 } // High pressure (high-red)
        },
        'high': { 
            'temperature': { min: 36 }, // Very hot (extreme-red or black)
            'pressure': { min: 1041 } // Very high pressure (extreme-high-red)
        }
    },
    'extreme-cold': {
        'moderate': { 
            'temperature': { max: -11, min: -24 }, // Very cold (light-blue)
            'wind': { min: 0, max: (80/3.6) } // Strong wind (orange)
        },
        'high': { 
            'temperature': { max: -25, min: -100 }, // Extreme cold (blue)
            'wind': { min: 0, max: (80/3.6) } // Very strong wind (red or extreme-red)
        }
    }
};



async function checkAlerts(weatherData, lat, lon) {
    console.log(weatherData);
    if (weatherData.rain >= alerts.flood.moderate.rain.min && weatherData.rain <= alerts.flood.moderate.rain.max && weatherData.pressure <= alerts.flood.moderate.pressure.max && weatherData.pressure >= alerts.flood.moderate.pressure.min) {
        
        await createAlert(await saveLocationAndGetLocationId(lat, lon), 'Moderate Flood Alert');
    }
    if (
        weatherData.rain >= alerts.flood.high.rain.min &&
        weatherData.pressure <= alerts.flood.high.pressure.max
    ) {
        await createAlert(await saveLocationAndGetLocationId(lat, lon), 'High Flood Alert');
    }

    // Storm alert
    if (
        (weatherData.wind >= alerts.storm.moderate.wind.min &&
        weatherData.wind <= alerts.storm.moderate.wind.max &&
        weatherData.pressure <= alerts.storm.moderate.pressure.max &&
        weatherData.pressure >= alerts.storm.moderate.pressure.min)
    ) {
        
        await createAlert(await saveLocationAndGetLocationId(lat, lon), 'Moderate Storm Alert');
    }
    if (
        weatherData.wind >= alerts.storm.high.wind.min &&
        weatherData.pressure <= alerts.storm.high.pressure.max
    ) {
        await createAlert(await saveLocationAndGetLocationId(lat, lon), 'High Storm Alert');
    }

    // Ice risk alert
    if (
        (weatherData.temperature <= alerts['ice-risk'].moderate.temperature.max &&
        weatherData.temperature >= alerts['ice-risk'].moderate.temperature.min &&
        weatherData.rain >= alerts['ice-risk'].moderate.rain.min &&
        weatherData.rain <= alerts['ice-risk'].moderate.rain.max)
    ) {
        await createAlert(await saveLocationAndGetLocationId(lat, lon), 'Moderate Ice Risk Alert');
    }
    if (
        weatherData.temperature <= alerts['ice-risk'].high.temperature.max &&
        weatherData.rain >= alerts['ice-risk'].high.rain.min
    ) {
        await createAlert(await saveLocationAndGetLocationId(lat, lon), 'High Ice Risk Alert');
    }

    // Strong wind alert
    if (
        (weatherData.wind >= alerts['strong-wind'].moderate.wind.min &&
        weatherData.wind <= alerts['strong-wind'].moderate.wind.max)
    ) {
        await createAlert(await saveLocationAndGetLocationId(lat, lon), 'Moderate Strong Wind Alert');
    }
    if (weatherData.wind >= alerts['strong-wind'].high.wind.min) {
        await createAlert(await saveLocationAndGetLocationId(lat, lon), 'High Strong Wind Alert');
    }

    // Extreme heat alert
    if (
        (weatherData.temperature >= alerts['extreme-heat'].moderate.temperature.min &&
        weatherData.temperature <= alerts['extreme-heat'].moderate.temperature.max &&
        weatherData.pressure >= alerts['extreme-heat'].moderate.pressure.min &&
        weatherData.pressure <= alerts['extreme-heat'].moderate.pressure.max)
    ) {
        await createAlert(await saveLocationAndGetLocationId(lat, lon), 'Moderate Extreme Heat Alert');
    }
    if (
        weatherData.temperature >= alerts['extreme-heat'].high.temperature.min &&
        weatherData.pressure >= alerts['extreme-heat'].high.pressure.min
    ) {
        await createAlert(await saveLocationAndGetLocationId(lat, lon), 'High Extreme Heat Alert');
    }

    // Extreme cold alert
    if (
        (weatherData.temperature <= alerts['extreme-cold'].moderate.temperature.max &&
        weatherData.temperature >= alerts['extreme-cold'].moderate.temperature.min &&
        weatherData.wind >= alerts['extreme-cold'].moderate.wind.min &&
        weatherData.wind <= alerts['extreme-cold'].moderate.wind.max)
    ) {
        await createAlert(await saveLocationAndGetLocationId(lat, lon), 'Moderate Extreme Cold Alert');
    }
    if (
        weatherData.temperature <= alerts['extreme-cold'].high.temperature.max &&
        weatherData.wind >= alerts['extreme-cold'].high.wind.min
    ) {
        await createAlert(await saveLocationAndGetLocationId(lat, lon), 'High Extreme Cold Alert');
    }

    // TODO A delete quand tout sera good !
    if (weatherData.pressure === 1027) {
        await createAlert(await saveLocationAndGetLocationId(lat, lon), 'Test Alert');
    }

    //return LocationAndAlerts;
}

export const getWeatherDatas = async (req, res) => {
    const { lat, lon } = await req.query;

    try {
        const weatherData = await fetchWeatherData(lat, lon);
        const weatherDataFormatted = weatherData.list.filter(data => data.dt_txt.includes('12:00:00')).map(data => ({
                date: data.dt_txt,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                cloud: data.clouds.all,
                wind: data.wind.speed,
                pressure: data.main.pressure,
                snow: data.snow || 0,
                rain: data.rain?.['3h'] || 0,
        }));

        //weatherDataFormatted.forEach(element => {console.log(element);});
    
        weatherDataFormatted.map(async (data) => {
            await checkAlerts(data, lat, lon);
        });

        res.status(200).json({ weatherDataFormatted, activeAlerts });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
