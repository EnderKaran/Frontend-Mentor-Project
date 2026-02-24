import React from 'react';

interface CountdownCardProps {
  current: number;
  previous: number;
  label: string;
}

const CountdownCard: React.FC<CountdownCardProps> = ({ current, previous, label }) => {
  const format = (val: number) => val.toString().padStart(2, '0');
  const isChanging = current !== previous;

  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 group">
      <div className="relative flex flex-col w-16 h-14 md:w-36 md:h-36 bg-[#2c2c44] rounded-lg shadow-[0_6px_0_0_#191a24] md:shadow-[0_10px_0_0_#191a24] perspective-1000">
        
        <div className="absolute inset-0 h-1/2 bg-[#2c2c44] rounded-t-lg border-b border-black/10 overflow-hidden flex items-end justify-center">
          <span className="text-[hsl(345,95%,68%)] text-3xl md:text-7xl font-bold translate-y-1/2">
            {format(current)}
          </span>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[#343650] rounded-b-lg overflow-hidden flex items-start justify-center">
          <span className="text-[hsl(345,95%,68%)] text-3xl md:text-7xl font-bold -translate-y-1/2">
            {format(previous)}
          </span>
        </div>

        {isChanging && (
          <div key={current} className="absolute inset-x-0 top-0 h-1/2 bg-[#2c2c44] rounded-t-lg border-b border-black/10 origin-bottom animate-flip z-20 backface-hidden flex items-end justify-center overflow-hidden">
            <span className="text-[hsl(345,95%,68%)] text-3xl md:text-7xl font-bold translate-y-1/2">
              {format(previous)}
            </span>
          </div>
        )}

        {/* Yan Çentikler */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-3 md:h-3 bg-[#191a24] rounded-full z-30" />
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-3 md:h-3 bg-[#191a24] rounded-full z-30" />
      </div>

      <span className="text-[hsl(237,18%,59%)] text-[8px] md:text-sm font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase">
        {label}
      </span>
    </div>
  );
};

export default CountdownCard;