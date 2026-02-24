// components/ThemeSwitcher.tsx
export default function ThemeSwitcher({ theme, setTheme }: { theme: string, setTheme: (t: string) => void }) {
  return (
    <div className="flex items-end gap-5">
      <span className="text-xs font-bold uppercase tracking-widest mb-1">Theme</span>
      
      <div className="flex flex-col gap-1 w-16">
        {/* Numaralar */}
        <div className="flex justify-between px-2 text-xs font-bold">
          <span>1</span><span>2</span><span>3</span>
        </div>
        
        {/* Switch Arka Planı */}
        <div className="relative flex items-center bg-[var(--bg-toggle-keypad)] rounded-full p-1 h-6">
          <div className="flex justify-between w-full relative z-10">
            {[1, 2, 3].map((num) => (
              <label key={num} className="cursor-pointer w-4 h-4">
                <input 
                  type="radio" 
                  name="theme"
                  value={num}
                  checked={theme === num.toString()}
                  onChange={(e) => setTheme(e.target.value)}
                  className="sr-only"
                />
                <span className={`block w-4 h-4 rounded-full transition-all ${theme === num.toString() ? 'bg-[var(--key-bg-equal)]' : 'bg-transparent'}`} />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}