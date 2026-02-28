const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export const getWeather = async (city: string = "Lima", abortSignal: AbortSignal) => {

    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current&key=${WEATHER_API_KEY}&contentType=json`, {
            signal: abortSignal
        })

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error("CITY_NOT_FOUND")
            }
            throw new Error(`API_ERROR: El servidor respondió con estado ${response.status}`);
        }

        const data = await response.json()

        const { address, currentConditions, timezone } = data
        const { conditions, feelslike, humidity, precipprob, temp, winddir, windspeed } = currentConditions

        return {
            address,
            conditions,
            feelslike,
            humidity,
            precipprob,
            temp,
            timezone,
            winddir,
            windspeed,
        }
    } catch (err) {
        if (err instanceof Error) {
            if (err.name === 'AbortError') {
                console.info(`Petición cancelada para la ciudad: ${city}`);
                throw err;
            }
            throw err;
        }
        throw new Error("Error desconocido al contactar la API del clima");
    }
}