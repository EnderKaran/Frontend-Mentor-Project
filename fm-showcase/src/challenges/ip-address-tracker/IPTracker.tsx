import { useState, useEffect } from "react";
import Header from "./Header";
import ResultsCard from "./ResultsCard";
import Map from "./Map"; // Harita bileşenini içeri aktarıyoruz

// API'den gelecek verinin tipi
interface IPData {
  ip: string;
  location: string;
  timezone: string;
  isp: string;
  lat: number;
  lng: number;
}

export default function IPTracker() {
  const [ipData, setIpData] = useState<IPData | null>(null);
  const [, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_IPIFY_API_KEY;

  // API isteği atan ana fonksiyon
  const fetchLocation = async (query = "") => {
    setIsLoading(true);
    setError("");
    
    // IP veya Domain araması için URL parametrelerini hazırlıyoruz
    const isIp = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(query);
    const searchParam = query ? (isIp ? `&ipAddress=${query}` : `&domain=${query}`) : "";
    
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}${searchParam}`
      );
      
      if (!response.ok) throw new Error("Could not fetch location data.");
      
      const data = await response.json();
      
      // Gelen veriyi arayüzün beklediği formata dönüştürüyoruz
      setIpData({
        ip: data.ip,
        location: `${data.location.city}, ${data.location.region} ${data.location.postalCode}`,
        timezone: data.location.timezone,
        isp: data.isp,
        lat: data.location.lat,
        lng: data.location.lng,
      });
    } catch (err) {
      setError("Please enter a valid IP address or domain.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-rubik bg-white">
      <Header onSearch={fetchLocation} />

      <main className="relative flex-1 flex flex-col items-center">
        {/* Hata Mesajı (Opsiyonel) */}
        {error && (
          <div className="absolute top-2 z-50 bg-red-500 text-white px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="w-full px-6 -mt-[80px] md:-mt-[75px] z-20 flex justify-center">
          {/* Veri yüklenene kadar boşluk oluşmaması için ipData kontrolü */}
          {ipData && (
            <ResultsCard 
              ip={ipData.ip}
              location={ipData.location}
              timezone={ipData.timezone}
              isp={ipData.isp}
            />
          )}
        </div>

        <section className="w-full flex-1 bg-neutral-200 z-10 overflow-hidden relative">
            {ipData && (
                <div className="h-full w-full"> {/* Map bileşeninin tam boy çalışması için yardımcı div */}
                <Map lat={ipData.lat} lng={ipData.lng} />
                </div>
            )}
            {/* ... loading durumu ... */}
            </section>
      </main>
    </div>
  );
}