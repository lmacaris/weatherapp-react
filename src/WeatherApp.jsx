import { useState } from "react"

export const WeatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = '0c838da8a5a361546b0d11d1def8c9db'
    const difKelvin = 273.15

    const [city, setCity] = useState('')
    const [dataClima, setDataClima] = useState(null)
    const handleChangeCity = (e) => {

        setCity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(city.length > 0) {
        fetchClima()
        }
    }

    const fetchClima = async () => {
        try {
            // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
            const response = await fetch(`${urlBase}?q=${city}&appid=${apiKey}`)
            const data = await response.json();
            setDataClima(data)
        } catch (error) {
            console.error('ay chalay')
        }
    }


    return (
        <div className="container">
            <h1>Weather App</h1>

            <form onSubmit={handleSubmit}>
                <input type="text"
                value={city}
                onChange={handleChangeCity}
                />
                <button type="submit"> Search</button>
            </form>

            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temp: {parseInt(dataClima.main?.temp - difKelvin)} °C</p>
                        <p>Weather conditions {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="" />
                    </div>
                )
            }
        </div>
    )
}
