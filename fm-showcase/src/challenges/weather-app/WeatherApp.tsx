import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

// Logo importunu şimdilik yapmıyorum, public klasöründen çekeceğiz.

export default function WeatherApp() {
  return (
    // Ana Kapsayıcı: Lacivert arka plan, DM Sans fontu
    <div className="min-h-screen bg-weather-bg text-white font-dmsans p-4 md:p-8 flex flex-col items-center">
      
      {/* Navbar (Geri Dön ve Logo) */}
      <nav className="w-full max-w-6xl flex justify-between items-center mb-8">
        <Button asChild variant="ghost" className="text-weather-text-gray hover:text-white hover:bg-weather-card">
            <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" /> Back to Showcase
            </Link>
        </Button>
        
        {/* Logo Alanı */}
        <div className="flex items-center gap-2">
            <img src="/images/weather-app/logo.png" alt="Weather Now" className="w-8 h-8 object-contain" />
            <span className="font-bold text-lg">Weather Now</span>
        </div>
      </nav>

      {/* Test Başlığı (Bricolage Fontu Testi) */}
      <div className="text-center space-y-4 max-w-2xl mt-10">
        <h1 className="text-5xl md:text-7xl font-bricolage font-bold leading-tight">
            How's the <br/> sky looking today?
        </h1>
        
        {/* Arama Çubuğu (Mockup) */}
        <div className="flex gap-3 bg-weather-card p-2 rounded-xl mt-8 shadow-lg border border-white/5">
            <div className="flex-1 flex items-center px-4 gap-3">
                <Search className="text-weather-text-gray w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="Search for a place..." 
                    className="bg-transparent border-none outline-none text-white w-full placeholder:text-weather-text-gray"
                />
            </div>
            <Button className="bg-weather-button hover:bg-blue-600 text-white rounded-lg px-6">
                Search
            </Button>
        </div>
      </div>

    </div>
  );
}