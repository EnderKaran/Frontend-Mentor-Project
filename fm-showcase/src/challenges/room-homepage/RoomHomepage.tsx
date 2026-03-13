import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import AboutSection from "./components/AboutSection";

export default function RoomHomepage() {
  return (
    <main className="min-h-screen bg-white font-spartan selection:bg-room-grey-500 selection:text-white overflow-x-hidden">
      
      <div className="relative">
        
        <Navbar />
        <HeroSlider />
      </div>

      <AboutSection />
      
      <footer className="py-4 text-center text-xs text-room-grey-500 bg-white">
        Challenge by <a href="https://www.frontendmentor.io" target="_blank" className="underline hover:text-room-black transition-colors">Frontend Mentor</a>. 
        Coded by <span className="font-bold text-room-black">Ender</span>.
      </footer>
    </main>
  );
}