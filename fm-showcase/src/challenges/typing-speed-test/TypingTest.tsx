import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react"; // RotateCcw: Restart ikonu
import { Button } from "@/components/ui/button";
import { textData } from "./data";

//importlar
import smallLogo from "../typing-speed-test/typing-test-images/logo-small.svg"

// Tipler
type Difficulty = 'easy' | 'medium' | 'hard';
type GameState = 'idle' | 'running' | 'finished';

export default function TypingTest(){

    // --- STATE'LER
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');
    const [gameState, setGameState] = useState<GameState>('idle');
    const [timeLeft, setTimeLeft] = useState(30); // Test için 30sn
    
    const [targetText, setTargetText] = useState(""); // Ekranda yazan metin
    const [userInput, setUserInput] = useState("");   // Kullanıcının yazdığı metin

    const inputRef = useRef<HTMLInputElement>(null);

    const startGame = () =>{
        // Seçili zorluktan rastgele metin seç
        const options = textData[difficulty];
        const randomText = options[Math.floor(Math.random() * options.length)].text;

        setTargetText(randomText);
        setUserInput("");
        setGameState('running');
        setTimeLeft(30);

        // Inputa otomatik odaklan ve klavyeyi aç (Mobilde)
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    // 2. Zamanlayıcı (Timer)
    useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    
    // Sadece oyun çalışıyorsa ve süre bitmediyse say
    if (gameState === 'running' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } 
    // Süre bittiyse oyunu bitir
    else if (timeLeft === 0) {
      setGameState('finished');
    }

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // 3. Yazma İşlemi
        const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (gameState === 'finished') return;

            
            if (gameState === 'idle') {
                startGame();
            }
            
            setUserInput(e.target.value);
        };

    return(
        <div className="min-h-screen bg-ty-black text-ty-gray-light font-sora p-6 flex flex-col items-center">
      
      {/* Header Kısmı (Aynı) */}
      <div className="w-full max-w-5xl mb-8 flex justify-between items-center">
        <Button asChild variant="ghost" className="text-ty-gray-light hover:text-white hover:bg-ty-gray-dark">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" /> Back
          </Link>
        </Button>
        <div className="text-xl font-bold text-ty-primary">
            Time: {timeLeft}s
        </div>
      </div>

      <header className="mb-12">
         <img src={smallLogo} alt="Logo" className="w-8 h-8 mx-auto mb-2" />
         <h1 className="text-2xl font-bold text-white">Typing Speed Test</h1>
      </header>

      {/* --- OYUN ALANI --- */}
      <main className="w-full max-w-5xl bg-ty-gray-dark rounded-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden flex flex-col gap-6">
        
        {/* Seçenekler (Zorluk Seviyesi) */}
        <div className="flex justify-center gap-4 mb-4">
           {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
             <button 
                key={level}
                onClick={() => setDifficulty(level)}
                disabled={gameState === 'running'}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    difficulty === level ? 'bg-ty-primary text-ty-black font-bold' : 'bg-ty-black text-ty-gray hover:text-white'
                }`}
             >
                {level}
             </button>
           ))}
        </div>

        {/* METİN ALANI (En Önemli Kısım) */}
        <div 
            className="relative text-2xl md:text-3xl leading-relaxed font-mono min-h-[150px] cursor-text"
            onClick={() => inputRef.current?.focus()} // Metne tıklayınca inputa odaklan
        >
            {gameState === 'idle' && !targetText ? (
                // Oyun başlamadıysa blur efektli örnek metin
                <div className="text-center text-ty-gray blur-[2px]">
                   Select a difficulty and press Start to begin the test...
                </div>
            ) : (
                // Oyun başladıysa harf harf boyama
                <div className="break-words">
                   {targetText.split("").map((char, index) => {
                      let colorClass = "text-ty-gray"; // Henüz yazılmadı (Gri)
                      
                      if (index < userInput.length) {
                          // Kullanıcı bu harfi yazdı, doğru mu?
                          colorClass = userInput[index] === char ? "text-green-400" : "text-red-500 bg-red-500/20";
                      }
                      
                      return (
                        <span key={index} className={`${colorClass} transition-colors`}>
                           {char}
                        </span>
                      );
                   })}
                </div>
            )}

            {/* GİZLİ INPUT (Klavyeyi dinleyen hayalet) */}
            <input 
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleTyping}
                className="absolute inset-0 opacity-0 cursor-default"
                autoComplete="off"
            />
        </div>

        {/* Start / Restart Butonu */}
        <div className="flex justify-center mt-6">
            {gameState === 'running' ? (
                <Button onClick={() => setGameState('finished')} variant="destructive">
                    Stop Test
                </Button>
            ) : (
                <Button 
                    onClick={startGame} 
                    className="bg-ty-primary text-ty-black hover:bg-yellow-300 font-bold px-8 py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                >
                    {gameState === 'finished' ? <><RotateCcw className="mr-2" /> Try Again</> : 'Start Test'}
                </Button>
            )}
        </div>

      </main>

      {/* Geçici Sonuç Göstergesi (Debug için) */}
      <div className="mt-8 text-center text-ty-gray">
         Status: {gameState} | Input Length: {userInput.length}
      </div>

    </div>
    );
}