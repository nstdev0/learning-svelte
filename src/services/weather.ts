export const getWeather = async (city: string = "Lima") => {

    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current&key=QJG58DERK557DYPE2AZBH9HS2&contentType=json`)

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