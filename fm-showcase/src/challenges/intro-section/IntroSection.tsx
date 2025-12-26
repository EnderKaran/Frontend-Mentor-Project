import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, X, ChevronDown, ChevronUp, 
  ListTodo, Calendar, Bell, Clock, ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";

//images
import databizimage from "./intro-section-images/client-databiz.svg";
import audiophileimage from "./intro-section-images/client-audiophile.svg";
import makerimage from "./intro-section-images/client-maker.svg";
import meetimage from "./intro-section-images/client-meet.svg";
import snapLogoimage from "./intro-section-images/logo.svg";
import herodesktopimage from "./intro-section-images/image-hero-desktop.png";
import heromobileimage from "./intro-section-images/image-hero-mobile.png";

export default function IntroSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Dropdown Menü
  const features = [
    { icon: <ListTodo className="w-4 h-4 text-purple-500" />, text: "Todo List" },
    { icon: <Calendar className="w-4 h-4 text-blue-400" />, text: "Calendar" },
    { icon: <Bell className="w-4 h-4 text-yellow-400" />, text: "Reminders" },
    { icon: <Clock className="w-4 h-4 text-purple-700" />, text: "Planning" },
  ];

  const company = [
    { text: "History" },
    { text: "Our Team" },
    { text: "Blog" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-epilogue text-[18px] text-[#696969] relative">
      
      {/* Vitrine Geri Dön Butonu */}
      <Button asChild variant="outline" className="fixed top-4 left-4 z-50 rounded-full w-10 h-10 p-0 bg-white/80 backdrop-blur shadow-md hover:bg-black hover:text-white">
        <Link to="/"><ArrowLeft className="w-5 h-5" /></Link>
      </Button>

      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between p-5 md:px-10 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-16">
          {/* Logo */}
          <h1 className="text-4xl font-bold text-[#141414] tracking-tight mt-[-5px]"><img src={snapLogoimage} alt="logo" /></h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            
            {/* Features Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('features')}
                className="flex items-center gap-2 hover:text-[#141414] transition-colors"
              >
                Features {activeDropdown === 'features' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </button>
              {/* Dropdown Content */}
              {activeDropdown === 'features' && (
                <div className="absolute top-10 right-0 bg-white shadow-2xl rounded-xl p-6 w-40 flex flex-col gap-4 text-sm z-20 animate-in fade-in zoom-in-95 duration-200">
                  {features.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 cursor-pointer hover:text-[#141414]">
                      {item.icon} <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('company')}
                className="flex items-center gap-2 hover:text-[#141414] transition-colors"
              >
                Company {activeDropdown === 'company' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </button>
              {activeDropdown === 'company' && (
                <div className="absolute top-10 left-0 bg-white shadow-2xl rounded-xl p-6 w-32 flex flex-col gap-4 text-sm z-20 animate-in fade-in zoom-in-95 duration-200">
                  {company.map((item, idx) => (
                    <div key={idx} className="cursor-pointer hover:text-[#141414]">
                      {item.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a href="#" className="hover:text-[#141414]">Careers</a>
            <a href="#" className="hover:text-[#141414]">About</a>
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button className="hover:text-[#141414]">Login</button>
          <button className="border-2 border-[#696969] text-[#696969] px-5 py-2 rounded-xl hover:border-[#141414] hover:text-[#141414] transition-colors">
            Register
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "" : <Menu className="w-8 h-8 text-[#141414]" />}
        </button>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden flex justify-end">
          <div className="w-[65%] h-full bg-[#FAFAFA] p-6 pt-20 flex flex-col gap-6 animate-in slide-in-from-right duration-300">
             {/* Close Button */}
             <button 
                className="absolute top-5 right-5"
                onClick={() => setIsMobileMenuOpen(false)}
             >
               <X className="w-8 h-8 text-[#696969]" />
             </button>

             {/* Mobile Links */}
             <div className="flex flex-col gap-4 text-base font-medium">
                {/* Mobile Features Dropdown */}
                <div>
                  <button 
                    onClick={() => toggleDropdown('features-mobile')}
                    className="flex items-center gap-4 hover:text-[#141414] mb-4"
                  >
                    Features {activeDropdown === 'features-mobile' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                  </button>
                  {activeDropdown === 'features-mobile' && (
                    <div className="pl-6 flex flex-col gap-4 text-sm mb-4">
                      {features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          {item.icon} <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Company Dropdown */}
                <div>
                  <button 
                    onClick={() => toggleDropdown('company-mobile')}
                    className="flex items-center gap-4 hover:text-[#141414] mb-4"
                  >
                    Company {activeDropdown === 'company-mobile' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                  </button>
                  {activeDropdown === 'company-mobile' && (
                    <div className="pl-6 flex flex-col gap-4 text-sm mb-4">
                      {company.map((item, idx) => (
                        <div key={idx}>{item.text}</div>
                      ))}
                    </div>
                  )}
                </div>

                <a href="#" className="hover:text-[#141414]">Careers</a>
                <a href="#" className="hover:text-[#141414]">About</a>
             </div>

             {/* Mobile Auth Buttons */}
             <div className="mt-4 flex flex-col gap-4 text-center text-sm">
                <button className="hover:text-[#141414]">Login</button>
                <button className="border border-[#696969] px-4 py-2 rounded-xl hover:border-[#141414] hover:text-[#141414]">
                   Register
                </button>
             </div>
          </div>
        </div>
      )}

      {/* --- MAIN HERO SECTION --- */}
      <main className="container mx-auto px-4 md:px-20 pb-10 flex flex-col-reverse md:flex-row items-center md:gap-20 md:h-[calc(100vh-100px)]">
        
        {/* Left: Text Content */}
        <div className="flex-1 text-center md:text-left pt-10 md:pt-0 flex flex-col items-center md:items-start md:pr-10">
          <h1 className="text-4xl md:text-[5rem] leading-none font-bold text-[#141414] mb-6 md:mb-12">
            Make <br className="hidden md:block"/> remote work
          </h1>
          <p className="text-[#696969] mb-8 md:mb-12 max-w-[450px] leading-relaxed">
            Get your team in sync, no matter your location. Streamline processes, 
            create team rituals, and watch productivity soar.
          </p>
          <Button className="bg-[#141414] text-white hover:bg-white hover:text-[#141414] border border-[#141414] rounded-2xl px-8 py-6 text-lg font-bold transition-all duration-300">
            Learn more
          </Button>

          {/* Client Logos */}
          <div className="mt-12 md:mt-24 flex items-center justify-between gap-6 w-full max-w-[480px]">
            <img src={databizimage} alt="client" className="h-4 md:h-5 object-contain" />
            <img src={audiophileimage} alt="client" className="h-4 md:h-8 object-contain" />
            <img src={meetimage} alt="client" className="h-4 md:h-5 object-contain" />
            <img src={makerimage} alt="client" className="h-4 md:h-6 object-contain" />
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="flex-1 w-full md:h-full flex items-center justify-center md:justify-end">
          {/* Mobile Image */}
          <img 
             src={heromobileimage} 
             alt="Hero Mobile" 
             className="w-full md:hidden object-contain"
          />
           {/* Desktop Image */}
           <img 
             src={herodesktopimage} 
             alt="Hero Desktop" 
             className="hidden md:block w-auto h-[80%] object-contain"
          />
        </div>
      </main>
    </div>
  );
}