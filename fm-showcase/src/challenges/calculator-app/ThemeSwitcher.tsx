interface ThemeSwitcherProps {
  theme: string;
  setTheme: (t: string) => void;
}

export default function ThemeSwitcher({ theme, setTheme }: ThemeSwitcherProps) {
  const themeNumbers = ["1", "2", "3"];

  return (
    <div className="flex items-end gap-6 select-none" role="radiogroup" aria-labelledby="theme-toggle-label">
      <span id="theme-toggle-label" className="text-xs font-bold uppercase tracking-widest mb-1 leading-none">
        Theme
      </span>
      
      <div className="flex flex-col gap-1 w-18">
        <div className="flex justify-between px-2 text-xs font-bold leading-none">
          {themeNumbers.map((num) => (
            <span key={num}>{num}</span>
          ))}
        </div>
        
        <div className="relative flex items-center bg-[var(--calc-bg-keypad)] rounded-full p-1 h-6 w-full shadow-inner">
          <div className="flex justify-between w-full relative z-10">
            {themeNumbers.map((num) => (
              <label 
                key={num} 
                className="cursor-pointer w-4 h-4 relative flex items-center justify-center"
                title={`Switch to Theme ${num}`}
              >
                <input 
                  type="radio" 
                  name="theme"
                  value={num}
                  checked={theme === num}
                  onChange={(e) => setTheme(e.target.value)}
                  className="sr-only" 
                  aria-label={`Theme ${num}`}
                />
                
                <span 
                  className={`
                    w-4 h-4 rounded-full transition-all duration-200 transform
                    ${theme === num 
                      ? 'bg-[var(--calc-key-bg-accent)] opacity-100 scale-100 hover:brightness-125' 
                      : 'opacity-0 scale-50'}
                  `} 
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}