import { useState, useEffect } from "react";
import CountdownCard from "./CountdownCard";
import { Facebook, Instagram, Twitter } from "lucide-react";

import patternhillsimage from "./Launch-countdown-timer-images/pattern-hills.svg";
import bgstarsimage from "./Launch-countdown-timer-images/bg-stars.svg";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function LaunchCountdown() {
  const [targetTime] = useState(Date.now() + (14 * DAY));
  
  const [timeLeft, setTimeLeft] = useState({
    days: { current: 14, previous: 14 },
    hours: { current: 0, previous: 0 },
    minutes: { current: 0, previous: 0 },
    seconds: { current: 0, previous: 0 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = targetTime - Date.now();

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / DAY);
      const h = Math.floor((diff % DAY) / HOUR);
      const m = Math.floor((diff % HOUR) / MINUTE);
      const s = Math.floor((diff % MINUTE) / SECOND);

      setTimeLeft(prev => ({
        days: { current: d, previous: prev.days.current },
        hours: { current: h, previous: prev.hours.current },
        minutes: { current: m, previous: prev.minutes.current },
        seconds: { current: s, previous: prev.seconds.current }
      }));
    }, 1000);

    return () => clearInterval(interval); 
  }, [targetTime]);

  return (
    <div className="relative min-h-screen bg-[#1e1f29] overflow-hidden flex flex-col items-center font-redhat selection:bg-soft-red/30">
      
      {/* YILDIZLAR */}
      <div 
        className="absolute inset-0 z-0 opacity-80 pointer-events-none"
        style={{ backgroundImage: `url(${bgstarsimage})`, backgroundSize: 'cover' }}
      />

      {/*  İÇERİK */}
      <main className="relative z-20 flex flex-col items-center pt-32 md:pt-44 w-full px-4">
        <h1 className="text-white tracking-[0.3em] md:tracking-[0.4em] uppercase text-lg md:text-2xl mb-16 md:mb-24 text-center font-bold">
          We're launching soon
        </h1>
        
        <div className="flex gap-4 md:gap-8 justify-center">
          <CountdownCard current={timeLeft.days.current} previous={timeLeft.days.previous} label="Days" />
          <CountdownCard current={timeLeft.hours.current} previous={timeLeft.hours.previous} label="Hours" />
          <CountdownCard current={timeLeft.minutes.current} previous={timeLeft.minutes.previous} label="Minutes" />
          <CountdownCard current={timeLeft.seconds.current} previous={timeLeft.seconds.previous} label="Seconds" />
        </div>
      </main>

      {/* DAĞLAR */}
      <div className="absolute bottom-0 w-full z-10 pointer-events-none">
        <img src={patternhillsimage} alt="" className="w-full object-cover object-left-bottom h-[20vh] md:h-auto min-h-[150px]" />
      </div>

      {/* FOOTER */}
      <footer className="absolute bottom-12 w-full z-30 flex justify-center gap-8">
        <a href="#" aria-label="Facebook" className="text-[hsl(237,18%,59%)] hover:text-[hsl(345,95%,68%)] transition-colors duration-300">
          <Facebook className="w-6 h-6" />
        </a>
        <a href="#" aria-label="Pinterest" className="text-[hsl(237,18%,59%)] hover:text-[hsl(345,95%,68%)] transition-colors duration-300">
          <Twitter className="w-6 h-6" />
        </a>
        <a href="#" aria-label="Instagram" className="text-[hsl(237,18%,59%)] hover:text-[hsl(345,95%,68%)] transition-colors duration-300">
          <Instagram className="w-6 h-6" />
        </a>
      </footer>
    </div>
  );
}