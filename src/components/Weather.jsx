import { useEffect, useRef, useState } from "react";//import useState and useEffect from react
import {
    Cloud,
    CloudRain,
    Sun,
    Wind,
    Droplets,
    Eye,
    Gauge,
    Search,
} from "lucide-react";//import icons from lucide-react

function Weather() {
    const [weatherData, setWeatherData] = useState(null);//state to store weather data
    const [forecast, setForecast] = useState(null);//state to store forecast data
    const [location, setLocation] = useState("Pune, Maharashtra, India");//state to store location
    const [searchInput, setSearchInput] = useState("");//state to store search input
    const [citySuggestions, setCitySuggestions] = useState([]);//state to store city suggestions
    const [loading, setLoading] = useState(false);//state to store loading status
    const [error, setError] = useState("");//state to store error message
    const searchRef = useRef(null);//search ref to detect click outside of the search bar

    //function to fetch weather data by coordinates
    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            setLoading(true);
            setError("");

            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,visibility,weather_code,wind_direction_10m,pressure_msl,apparent_temperature,uv_index,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto`
            );

            const data = await weatherResponse.json();
            setWeatherData(data);

            const dailyData = {
                times: data.daily.time,
                maxTemps: data.daily.temperature_2m_max,
                minTemps: data.daily.temperature_2m_min,
                weatherCodes: data.daily.weather_code,
                precipitation: data.daily.precipitation_sum,
            };
            setForecast(dailyData);
            setSearchInput("")
        } catch (error) {
            setError("Failed to fetch weather data");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    //function to search for a location
    const searchLocation = async () => {
        if (!searchInput.trim()) return;

        try {
            setLoading(true);
            setError("");

            const geoResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${searchInput}&count=1&language=en&format=json`
            );
            const geoData = await geoResponse.json();

            if (geoData.results && geoData.results.length > 0) {
                const result = geoData.results[0];
                setLocation(
                    `${result.name}${result.admin1 ? ", " + result.admin1 : ""}${result.country ? ", " + result.country : ""
                    }`
                );
                setSearchInput("");
                fetchWeatherByCoords(result.latitude, result.longitude);
            } else {
                setError("Location not found");
            }
        } catch (error) {
            setError("Error searching location");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    //function to get weather icon based on weather code
    const getWeatherIcon = (weatherCode) => {
        if (weatherCode === undefined || weatherCode === null) return <Cloud className="w-12 h-12" />;

        if (weatherCode === 0 || weatherCode === 1) {
            return <Sun className="w-12 h-12 text-yellow-400" />;
        } else if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
            return <CloudRain className="w-12 h-12 text-blue-400" />;
        } else if (
            weatherCode >= 70 &&
            weatherCode <= 78 &&
            weatherCode !== 80 &&
            weatherCode !== 81 &&
            weatherCode !== 82
        ) {
            return <CloudRain className="w-12 h-12 text-blue-400" />;
        }
        return <Cloud className="w-12 h-12 text-gray-400" />;
    };

    //function to get weather description based on weather code
    const getWeatherDescription = (weatherCode) => {
        if (!weatherCode) return "Unknown";

        const descriptions = {
            0: "Clear Sky",
            1: "Mainly Clear",
            2: "Partly Cloudy",
            3: "Overcast",
            45: "Foggy",
            48: "Foggy",
            51: "Light Drizzle",
            53: "Drizzle",
            55: "Heavy Drizzle",
            61: "Slight Rain",
            63: "Rain",
            65: "Heavy Rain",
            71: "Slight Snow",
            73: "Snow",
            75: "Heavy Snow",
            77: "Snow Grains",
            80: "Light Showers",
            81: "Showers",
            82: "Heavy Showers",
            85: "Light Snow Showers",
            86: "Snow Showers",
            95: "Thunderstorm",
            96: "Thunderstorm with Hail",
            99: "Thunderstorm with Hail",
        };

        return descriptions[weatherCode] || "Unknown";
    };

    useEffect(() => {
        fetchWeatherByCoords(18.5204, 73.8567); // Default: Pune
    }, []);

    useEffect(() => {
        if (searchInput.trim().length < 1) {//if search input is empty, clear city suggestions
            setCitySuggestions([]);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${searchInput}&count=5&language=en&format=json`
                );

                const data = await response.json();
                setCitySuggestions(data.results || []);
            } catch (error) {
                console.error(error);
            }
        }, 300); // Debounce API call by 300ms

        return () => clearTimeout(timer);
    }, [searchInput]);

    useEffect(() => { //useEffect to handle click outside of the search bar to close suggestions
        function handleClickOutside(event) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setCitySuggestions([]);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-indigo-500 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-white mb-2">Weatherly</h1>
                    <p className="text-blue-100">Beautiful weather forecasts at your fingertips</p>
                </div>

                {/* Search Bar */}
                <div className="relative z-50 bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-4 mb-6 shadow-xl">
                    <div className="flex gap-2">
                        <div className="flex-1 relative" ref={searchRef}>
                            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400 opacity-70" />
                            <input
                                type="text"
                                placeholder="Search for a city..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && searchLocation()}
                                className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-30 text-slate-900 placeholder-gray-400 rounded-lg focus:outline-none focus:bg-opacity-50 border border-white border-opacity-30"
                            />
                            {citySuggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl overflow-hidden z-50">
                                    {citySuggestions.map((city) => (
                                        <button
                                            key={`${city.latitude}-${city.longitude}`}
                                            type="button"
                                            className="w-full text-left px-4 py-3 hover:bg-gray-100 transition"
                                            onClick={() => {
                                                setLocation(
                                                    `${city.name}${city.admin1 ? ", " + city.admin1 : ""}, ${city.country}`
                                                );

                                                setSearchInput(city.name);
                                                setCitySuggestions([]);
                                                fetchWeatherByCoords(city.latitude, city.longitude);
                                            }}
                                        >
                                            <div className="font-medium text-gray-800 z-10">
                                                {city.name}
                                            </div>
                                            <div className="text-sm text-gray-500 z-10">
                                                {city.admin1 && `${city.admin1}, `}
                                                {city.country}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={searchLocation}
                            disabled={loading}
                            className="bg-slate-100 text-blue-500 px-6 py-2 rounded-lg font-semibold hover:bg-blue-200 hover:cursor-pointer transition disabled:opacity-50"
                        >
                            {loading ? "Searching..." : "Search"}
                        </button>
                    </div>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>

                {loading && !weatherData ? (
                    <div className="text-center text-white">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        <p className="mt-4">Loading weather data...</p>
                    </div>
                ) : weatherData ? (
                    <>
                        {/* Current Weather Card */}
                        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-8 mb-6 shadow-2xl border border-white border-opacity-30 z-0">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-700 mb-1">{location}</h2>
                                    <p className="text-blue-400">
                                        {new Date().toLocaleDateString("en-US", {
                                            weekday: "long",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-6xl font-bold text-slate-700">
                                        {Math.round(weatherData.current.temperature_2m)}°
                                    </p>
                                    <p className="text-blue-400">
                                        Feels like {Math.round(weatherData.current.apparent_temperature)}°
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-5">
                                {getWeatherIcon(weatherData.current.weather_code)}
                                <div>
                                    <p className="text-2xl text-gray-600 font-semibold">
                                        {getWeatherDescription(weatherData.current.weather_code)}
                                    </p>
                                    <p className="text-blue-400">Clouds: {weatherData.current.cloud_cover}%</p>
                                </div>
                            </div>

                            {/* Weather Details Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Droplets className="w-5 h-5 text-blue-400" />
                                        <span className="text-blue-400 text-sm">Humidity</span>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-600">
                                        {weatherData.current.relative_humidity_2m}%
                                    </p>
                                </div>

                                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Wind className="w-5 h-5 text-blue-400" />
                                        <span className="text-blue-400 text-sm">Wind Speed</span>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-600">
                                        {Math.round(weatherData.current.wind_speed_10m)} km/h
                                    </p>
                                </div>

                                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Eye className="w-5 h-5 text-blue-400" />
                                        <span className="text-blue-400 text-sm">Visibility</span>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-600">
                                        {(weatherData.current.visibility / 1000).toFixed(1)} km
                                    </p>
                                </div>

                                <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Gauge className="w-5 h-5 text-blue-400" />
                                        <span className="text-blue-400 text-sm">Pressure</span>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-600">
                                        {Math.round(weatherData.current.pressure_msl)} mb
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Forecast */}
                        {forecast && (
                            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white border-opacity-30">
                                <h3 className="text-2xl font-bold text-slate-700 mb-3">7-Day Forecast</h3>
                                <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                                    {forecast.times.slice(0, 7).map((date, index) => (
                                        <div
                                            key={index}
                                            className="bg-white bg-opacity-10 rounded-xl p-2 text-center backdrop-blur-sm hover:bg-opacity-20 transition"
                                        >
                                            <p className="text-gray-600 font-semibold mb-1">
                                                {new Date(date).toLocaleDateString("en-US", {
                                                    weekday: "short",
                                                })}
                                            </p>
                                            <p className="text-xs text-blue-400 mb-1">
                                                {new Date(date).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </p>
                                            <div className="flex justify-center mb-2">
                                                {getWeatherIcon(forecast.weatherCodes[index])}
                                            </div>
                                            <p className="text-gray-600 font-bold mb-1">
                                                {Math.round(forecast.maxTemps[index])}°
                                            </p>
                                            <p className="text-blue-400 text-sm">
                                                {Math.round(forecast.minTemps[index])}°
                                            </p>
                                            {forecast.precipitation[index] > 0 && (
                                                <p className="text-blue-400 text-xs mt-2">
                                                    💧 {Math.round(forecast.precipitation[index])}mm
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center text-white">
                        <p>Unable to load weather data</p>
                    </div>
                )}
            </div>
            <footer className="text-center font-mono font-semibold text-blue-100 mt-8">
                Built with ❤️ by Afnan Khan
            </footer>
        </div>
    );
}

export default Weather;