import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Loader2, MapPin, AlertCircle, CalendarDays, Clock, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { searchCity, getWeather } from "./api";
import type { CityData, WeatherData } from "./api";

// --- RESİM IMPORTLARI (SENİN İSTEDİĞİN GİBİ) ---
import sunnyIcon from "../weather-app/weather-app-image/icon-sunny.webp";
import fogIcon from "../weather-app/weather-app-image/icon-fog.webp";
import cloudyIcon from "../weather-app/weather-app-image/icon-partly-cloudy.webp";
import rainIcon from "../weather-app/weather-app-image/icon-rain.webp";
import snowIcon from "../weather-app/weather-app-image/icon-snow.webp";
import stormIcon from "../weather-app/weather-app-image/icon-storm.webp";
import partly_cloudyIcon from "../weather-app/weather-app-image/icon-partly-cloudy.webp";
import logo from "../weather-app/weather-app-image/logo.svg";

// --- YARDIMCI FONKSİYONLAR ---
const getWeatherIcon = (code: number) => {
  if (code === 0) return sunnyIcon;
  if (code >= 1 && code <= 3) return cloudyIcon;
  if (code >= 45 && code <= 48) return fogIcon;
  if (code >= 51 && code <= 67) return rainIcon;
  if (code >= 71 && code <= 86) return snowIcon;
  if (code >= 95 && code <= 99) return stormIcon;
  return partly_cloudyIcon;
};

const formatDate = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getDayName = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

const getHour = (timeStr: string) => {
  return new Date(timeStr).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
};

export default function WeatherApp() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<CityData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  // --- YENİ STATE'LER ---
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (city) {
      fetchWeatherForCity(city, unit);
    }
  }, [unit]);

  const fetchWeatherForCity = async (selectedCity: CityData, selectedUnit: 'celsius' | 'fahrenheit') => {
    setLoading(true);
    const weatherData = await getWeather(selectedCity.latitude, selectedCity.longitude, selectedUnit);
    if (weatherData) setWeather(weatherData);
    else setError(true);
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(false);
    setCity(null);
    setWeather(null);

    const cities = await searchCity(query);
    
    if (cities && cities.length > 0) {
      const selectedCity = cities[0];
      setCity(selectedCity);
      fetchWeatherForCity(selectedCity, unit);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const getCurrentHourlyData = () => {
    if (!weather) return [];
    const currentHourIndex = weather.hourly.time.findIndex(time => new Date(time) > new Date());
    const startIndex = currentHourIndex === -1 ? 0 : currentHourIndex;
    
    const next12Hours = [];
    for (let i = startIndex; i < startIndex + 12; i++) {
        if (weather.hourly.time[i]) {
            next12Hours.push({
                time: weather.hourly.time[i],
                temp: weather.hourly.temperature_2m[i],
                code: weather.hourly.weather_code[i]
            });
        }
    }
    return next12Hours;
  };

  return (
    <div className="min-h-screen bg-[#0B0C1E] text-white font-dmsans p-4 md:p-8 flex flex-col items-center">
      
      {/* Navbar */}
      <nav className="w-full max-w-7xl flex justify-between items-center mb-8 relative z-50">
        <Button asChild variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5">
            <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" /> Back
            </Link>
        </Button>
        
        <div className="hidden md:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
            <img src={logo} alt="Weather Now" className="w-30 h-30 object-contain" />
        </div>

        {/* UNITS DROPDOWN */}
        <div className="relative">
            <Button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-[#1C1C2E] text-white hover:bg-[#252540] border border-white/5 gap-2 font-medium"
            >
                <Settings className="w-4 h-4" /> Units <ChevronDown className="w-4 h-4" />
            </Button>

            {isDropdownOpen && (
                <div className="absolute right-0 top-12 w-48 bg-[#1C1C2E] border border-white/10 rounded-xl shadow-2xl p-2 flex flex-col gap-1 animate-in fade-in zoom-in-95 z-50">
                    <button 
                        onClick={() => { setUnit('celsius'); setIsDropdownOpen(false); }}
                        className={`text-left px-4 py-2 rounded-lg text-sm transition-colors ${unit === 'celsius' ? 'bg-[#3B82F6] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        Celsius (°C)
                    </button>
                    <button 
                        onClick={() => { setUnit('fahrenheit'); setIsDropdownOpen(false); }}
                        className={`text-left px-4 py-2 rounded-lg text-sm transition-colors ${unit === 'fahrenheit' ? 'bg-[#3B82F6] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        Fahrenheit (°F)
                    </button>
                </div>
            )}
        </div>
      </nav>

      {/* Ana İçerik */}
      <div className="w-full max-w-7xl space-y-8">
        
        {/* Başlık & Arama */}
        <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bricolage font-bold leading-tight">
                How's the <br/> sky looking today?
            </h1>
            <div className="flex gap-3 bg-[#1C1C2E] p-2 rounded-xl shadow-lg border border-white/5 transition-all focus-within:border-[#3B82F6]/50">
                <div className="flex-1 flex items-center px-4 gap-3">
                    <Search className="text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search for a place..." 
                        className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-500 font-medium"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <Button onClick={handleSearch} disabled={loading} className="bg-[#3B82F6] hover:bg-blue-600 text-white rounded-lg px-6 h-10 font-bold transition-transform active:scale-95">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
                </Button>
            </div>
        </div>

        {/* HATA MESAJI */}
        {error && (
            <div className="max-w-2xl mx-auto bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl flex items-center gap-3 justify-center animate-in fade-in">
                <AlertCircle className="w-5 h-5" />
                <span>City not found or server error.</span>
            </div>
        )}

        {/* --- HAVA DURUMU PANO --- */}
        {weather && city && !loading && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-500">
                
                {/* SOL KOLON */}
                <div className="lg:col-span-2 space-y-6">
                    {/* BÜYÜK ANA KART */}
                    <div className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] p-8 rounded-[2rem] border border-white/10 relative overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Dekoratif Işıklar */}
                        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/20 rounded-full blur-[80px]" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-purple-500/30 rounded-full blur-[80px]" />
                        
                        <div className="text-center md:text-left z-10">
                            <h2 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-2">
                                <MapPin className="w-6 h-6 text-white" /> {city.name}, {city.country}
                            </h2>
                            <p className="text-blue-100 mt-2 text-lg">{formatDate()}</p>
                        </div>
                        <div className="text-center z-10">
                             <div className="text-8xl font-bold font-bricolage drop-shadow-lg">
                                {Math.round(weather.current.temperature_2m)}°
                             </div>
                             <div className="text-blue-100 text-lg mt-1 capitalize font-medium">Current Weather</div>
                        </div>
                        <div className="relative w-40 h-40 drop-shadow-2xl z-10">
                            <img src={getWeatherIcon(weather.current.weather_code)} alt="icon" className="w-full h-full object-contain" />
                        </div>
                    </div>

                    {/* DETAY KARTLARI (Kutu Tasarımı) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { 
                                label: "Feels Like", 
                                value: `${Math.round(weather.current.apparent_temperature)}°` 
                            },
                            { 
                                label: "Humidity", 
                                value: `${weather.current.relative_humidity_2m}%` 
                            },
                            { 
                                label: "Wind", 
                                value: `${weather.current.wind_speed_10m}`,
                                unit: unit === 'celsius' ? 'km/h' : 'mph' 
                            },
                            { 
                                label: "Precipitation", 
                                value: `${weather.current.precipitation}`,
                                unit: unit === 'celsius' ? 'mm' : 'in'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-[#1C1C2E] p-6 rounded-2xl border border-white/5 shadow-lg flex flex-col justify-center">
                                <div className="text-gray-400 text-sm mb-2">{item.label}</div>
                                <div className="text-2xl font-bold">
                                    {item.value} <span className="text-sm font-normal text-gray-500">{item.unit}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* DAILY FORECAST */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-400 px-1">
                            <CalendarDays className="w-5 h-5" /> <span className="font-bold">Daily Forecast</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                            {weather.daily.time.map((time, index) => (
                                <div key={index} className="bg-[#1C1C2E] p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center gap-3 hover:bg-[#252540] transition-colors cursor-pointer group">
                                    <span className="text-sm font-bold text-gray-400 group-hover:text-white">{getDayName(time)}</span>
                                    <img src={getWeatherIcon(weather.daily.weather_code[index])} alt="icon" className="w-10 h-10 object-contain drop-shadow-md" />
                                    <div className="text-sm font-bold">
                                        {Math.round(weather.daily.temperature_2m_max[index])}° 
                                        <span className="text-gray-500 ml-1 font-normal">{Math.round(weather.daily.temperature_2m_min[index])}°</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SAĞ KOLON: SAATLİK TAHMİN (Sidebar Görünümü) */}
                <div className="bg-[#1C1C2E] rounded-[2rem] border border-white/5 p-6 h-fit shadow-lg">
                    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-2 text-gray-300">
                            <Clock className="w-5 h-5" /> <span className="font-bold">Hourly Forecast</span>
                        </div>
                        <span className="text-xs text-[#3B82F6] font-bold px-3 py-1 bg-[#3B82F6]/10 rounded-full">Next 12h</span>
                    </div>
                    
                    <div className="space-y-1">
                        {getCurrentHourlyData().map((hour, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                <span className="text-sm font-medium w-16 text-gray-400">{getHour(hour.time)}</span>
                                <img src={getWeatherIcon(hour.code)} alt="icon" className="w-8 h-8 object-contain" />
                                <span className="text-lg font-bold w-12 text-right">{Math.round(hour.temp)}°</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        )}

      </div>
    </div>
  );
}