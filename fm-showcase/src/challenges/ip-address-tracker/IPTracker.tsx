import { useState } from "react";
import Header from "./Header";
import ResultsCard from "./ResultsCard";

const INITIAL_DATA = {
  ip: "192.212.174.101",
  location: "Brooklyn, NY 10001",
  timezone: "-05:00",
  isp: "SpaceX Starlink",
  lat: 43.733,
  lng: 7.416
};

export default function IPTracker() {
  const [ipData,] = useState(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    console.log(`${query} için API isteği hazırlanıyor...`);
    
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="min-h-screen flex flex-col font-rubik bg-white">
      <Header onSearch={handleSearch} />

      <main className="relative flex-1 flex flex-col items-center">
        
        <div className="w-full px-6 -mt-[80px] md:-mt-[75px] z-20 flex justify-center">
          <ResultsCard 
            ip={ipData.ip}
            location={ipData.location}
            timezone={ipData.timezone}
            isp={ipData.isp}
          />
        </div>

        <section className="w-full flex-1 bg-neutral-200 z-10 overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center text-neutral-400 italic">
            {isLoading ? "Fetching data..." : "Map will be rendered here with LeafletJS"}
          </div>
        </section>
      </main>
    </div>
  );
}