import { useState, useEffect } from "react";
import CountdownCard from "./CountdownCard";

// Zaman sabitleri (Milisaniye)
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function LaunchCountdown() {
  // Hedef süreyi 14 gün sonrasına sabitliyoruz
  const [targetTime] = useState(Date.now() + (14 * DAY));
  
  const [timeLeft, setTimeLeft] = useState({
    days: { current: 14, previous: 14 },
    hours: { current: 0, previous: 0 },
    minutes: { current: 0, previous: 0 },
    seconds: { current: 0, previous: 0 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      // Matematiksel Dağıtım: $diff = target - now$
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
    <main className="min-h-screen bg-[#1e1f29] flex flex-col items-center justify-center p-4">
      <h1 className="text-white tracking-[0.3em] uppercase text-xl mb-24 text-center font-bold">
        We're launching soon
      </h1>
      
      <div className="flex gap-4 md:gap-8">
        <CountdownCard current={timeLeft.days.current} previous={timeLeft.days.previous} label="Days" />
        <CountdownCard current={timeLeft.hours.current} previous={timeLeft.hours.previous} label="Hours" />
        <CountdownCard current={timeLeft.minutes.current} previous={timeLeft.minutes.previous} label="Minutes" />
        <CountdownCard current={timeLeft.seconds.current} previous={timeLeft.seconds.previous} label="Seconds" />
      </div>
    </main>
  );
}