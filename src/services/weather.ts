const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export const getWeather = async (city: string = "Lima") => {

    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current&key=${WEATHER_API_KEY}&contentType=json`)

        if (response.status === 400) {
            throw new Error("CITY_NOT_FOUND")
        }

        const data = await response.json()

        const { address, currentConditions, timezone } = data
        const { conditions, feelslike, humidity, precipprob, temp, winddir, windspeed } = currentConditions

        return {
            address,
            timezone,
            conditions,
            feelslike,
            humidity,
            precipprob,
            temp,
            winddir,
            windspeed
        }
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message)
        }
    }
}