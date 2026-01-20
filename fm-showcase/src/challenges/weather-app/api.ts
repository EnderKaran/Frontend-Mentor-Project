//TİPLER

// 1. Şehir Arama Sonucu Tipi
export interface CityData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

// 2. Hava Durumu Sonucu Tipi
export interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number; // Hissedilen
    is_day: number; // 1 = Gündüz, 0 = Gece
    precipitation: number;
    weather_code: number; // İkon seçimi için (0 = Güneşli vb.)
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

// Şehir Bulma Fonksiyonu
export const searchCity = async (query: string): Promise<CityData[] | null> => {
  try {
    const res = await fetch(`${GEO_URL}?name=${query}&count=5&language=en&format=json`);
    const data = await res.json();
    
    if (!data.results) return null;
    return data.results;
  } catch (error) {
    console.error("Şehir arama hatası:", error);
    return null;
  }
};

// Hava Durumu Çekme Fonksiyonu
export const getWeather = async (lat: number, lon: number, unit: 'celsius' | 'fahrenheit' = 'celsius'): Promise<WeatherData | null> => {
  try {
    // Birim ayarları
    const tempUnit = unit === 'celsius' ? '' : '&temperature_unit=fahrenheit';
    const windUnit = unit === 'celsius' ? '' : '&wind_speed_unit=mph&precipitation_unit=inch';

    const url = `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto${tempUnit}${windUnit}`;

    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Hava durumu hatası:", error);
    return null;
  }
};