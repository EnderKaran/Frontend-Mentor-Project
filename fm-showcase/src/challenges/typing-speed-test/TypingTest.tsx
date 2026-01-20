import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, PartyPopper } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { textData } from "./data";
import confetti from "canvas-confetti"; 

import smallLogo from "../typing-speed-test/typing-test-images/logo-small.svg";

type Difficulty = 'easy' | 'medium' | 'hard';
type GameState = 'idle' | 'running' | 'finished';

export default function TypingTest() {
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');
    const [gameState, setGameState] = useState<GameState>('idle');
    const [timeLeft, setTimeLeft] = useState(60); 
    
    const [targetText, setTargetText] = useState(""); 
    const [userInput, setUserInput] = useState("");   

    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [personalBest, setPersonalBest] = useState(0);
    const [isNewRecord, setIsNewRecord] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const savedBest = localStorage.getItem("typing-speed-best");
        if (savedBest) setPersonalBest(parseInt(savedBest));
        
        const options = textData['medium'];
        setTargetText(options[Math.floor(Math.random() * options.length)].text);
    }, []);

    const startGame = () => {
        const options = textData[difficulty];
        
        let randomText;
        do {
            randomText = options[Math.floor(Math.random() * options.length)].text;
        } while (randomText === targetText && options.length > 1);

        setTargetText(randomText);
        setUserInput("");
        setGameState('running');
        setTimeLeft(60);
        setIsNewRecord(false);
        setWpm(0);
        setAccuracy(0);

        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.value = "";
                inputRef.current.focus();
            }
        }, 150);
    };

    const finishGame = () => {
        if (gameState === 'finished') return;

        setGameState('finished');

        const timeElapsed = 60 - timeLeft;
        const totalChars = userInput.length;
        const correctChars = userInput.split('').filter((char, i) => char === targetText[i]).length;
        const accuracyCalc = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
        const timeInMinutes = timeElapsed === 0 ? 1 : (60 - timeLeft) / 60;
        const wpmCalc = Math.round((correctChars / 5) / (timeInMinutes < 0.1 ? 1 : timeInMinutes));

        setWpm(wpmCalc);
        setAccuracy(accuracyCalc);

        if (wpmCalc > personalBest) {
            setIsNewRecord(true);
            setPersonalBest(wpmCalc);
            localStorage.setItem("typing-speed-best", wpmCalc.toString());

            const duration = 3000;
            const end = Date.now() + duration;
            const frame = () => {
                confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#FACC15', '#CA8A04'] });
                confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#FACC15', '#CA8A04'] });
                if (Date.now() < end) requestAnimationFrame(frame);
            };
            frame();
        }
    };

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (gameState === 'running' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && gameState === 'running') {
            finishGame();
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft]);

    useEffect(() => {
        if(gameState === 'running' && userInput.length >= targetText.length && targetText !== "") {
            finishGame();
        }
    }, [userInput, targetText, gameState]);

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gameState === 'finished') return;
        if (gameState === 'idle') startGame();
        setUserInput(e.target.value);
    };

    return(
        <div className="min-h-screen bg-[#0E0E0E] text-gray-400 font-sora p-6 flex flex-col items-center relative overflow-y-auto">
      
            {/* Üst Bar */}
            <div className="w-full max-w-5xl mb-8 flex justify-between items-center z-10">
                <Button asChild variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
                    <Link to="/" className="flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5" /> Back
                    </Link>
                </Button>
                <div className="flex gap-6 text-sm font-bold">
                    <div className="bg-[#1C1C1C] px-4 py-2 rounded-lg text-white border border-white/10">
                        Best: <span className="text-yellow-400">{personalBest} WPM</span>
                    </div>
                    <div className="bg-[#1C1C1C] px-4 py-2 rounded-lg text-white border border-white/10">
                        Time: <span className={timeLeft < 10 ? "text-red-500" : ""}>{timeLeft}s</span>
                    </div>
                </div>
            </div>

            {/* HEADER */}
            <header className="mb-12 text-center z-10 relative">
                <div className="inline-block relative">
                    <img src={smallLogo} alt="Typing Test Logo" className="w-12 h-12 mx-auto mb-3 block opacity-100" />
                </div>
                <h1 className="text-3xl font-bold text-white">Typing Speed Test</h1>
            </header>

            {/* OYUN ALANI */}
            <main className="w-full max-w-5xl bg-[#1C1C1C] rounded-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden flex flex-col gap-6 min-h-[400px] z-10 shadow-2xl">
                
                {/* --- ZORLUK SEÇİMİ */}
                <div className="flex justify-center gap-4 mb-4">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
                    <button 
                        key={level}
                        onClick={() => {
                            setDifficulty(level);
                            
                            // Zorluk değişince her şeyi sıfırla (Reset)
                            const options = textData[level];
                            setTargetText(options[Math.floor(Math.random() * options.length)].text);
                            setUserInput("");
                            setGameState('idle'); // Oyunu durdur ve başa al
                            setTimeLeft(60);
                            setWpm(0);
                            setAccuracy(0);
                            
                            
                            if(inputRef.current) inputRef.current.blur();
                        }}
                        className={`px-4 py-2 rounded-lg capitalize transition-colors border ${
                            difficulty === level 
                            ? 'bg-yellow-400 text-black font-bold border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]' 
                            : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                    >
                        {level}
                    </button>
                ))}
                </div>

                {/* METİN ALANI */}
                <div 
                    className="relative text-2xl md:text-3xl leading-relaxed font-mono min-h-[150px] cursor-text outline-none"
                    onClick={() => inputRef.current?.focus()}
                >
                    <div className={`break-words transition-all duration-300 ${gameState === 'idle' ? 'blur-[4px] opacity-70' : 'blur-0 opacity-100'}`}>
                        {targetText.split("").map((char, index) => {
                            let colorClass = "text-gray-500"; 
                            let borderClass = "";

                            if (index < userInput.length) {
                                colorClass = userInput[index] === char ? "text-yellow-400" : "text-red-500 bg-red-500/10";
                            }
                            if (gameState === 'running' && index === userInput.length) {
                                borderClass = "border-l-2 border-yellow-400 animate-pulse";
                                colorClass = "text-white"; 
                            }
                            
                            return (
                                <span key={index} className={`${colorClass} ${borderClass} px-[1px] transition-colors`}>
                                {char}
                                </span>
                            );
                        })}
                    </div>
                    
                    {gameState === 'idle' && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                            <span className="text-white bg-black/60 px-6 py-3 rounded-lg backdrop-blur-md font-bold border border-white/20 shadow-xl">
                                Press Start Button Below 👇
                            </span>
                        </div>
                    )}

                    <input 
                        ref={inputRef}
                        type="text"
                        value={userInput}
                        onChange={handleTyping}
                        className="absolute inset-0 opacity-0 cursor-default"
                        autoComplete="off"
                        autoFocus
                    />
                </div>

                <div className="flex justify-center mt-auto relative z-30 pt-6">
                   
                    <Button 
                        onClick={() => {
                            // Eğer oyun bitmişse veya çalışıyorsa yeniden başlat
                            startGame();
                        }}
                        className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold px-12 py-8 text-2xl rounded-2xl shadow-[0_0_40px_rgba(250,204,21,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(250,204,21,0.5)] cursor-pointer border-none"
                    >
                        {gameState === 'idle' ? 'Start Typing Test' : 'Restart Test'}
                    </Button>
                </div>
            </main>

            {/* --- SONUÇ MODALI --- */}
            {gameState === 'finished' && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-[#1C1C1C] border border-white/10 rounded-2xl p-10 max-w-lg w-full text-center shadow-2xl relative">
                        
                        {isNewRecord ? (
                            <div className="mb-8">
                                <div className="inline-block p-4 bg-yellow-400/10 rounded-full mb-4">
                                   <PartyPopper className="w-16 h-16 text-yellow-400 animate-bounce" />
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-2">High Score Smashed!</h2>
                                <p className="text-gray-400 text-lg">You're getting faster. That was incredible typing.</p>
                            </div>
                        ) : (
                            <div className="mb-8">
                                <div className="inline-block p-4 bg-white/5 rounded-full mb-4">
                                   <RotateCcw className="w-12 h-12 text-white" />
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-2">Test Complete!</h2>
                                <p className="text-gray-400 text-lg">Solid run. Keep pushing to beat your high score.</p>
                            </div>
                        )}

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">WPM</div>
                                <div className="text-4xl font-bold text-white">{wpm}</div>
                            </div>
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Accuracy</div>
                                <div className={`text-4xl font-bold ${accuracy >= 90 ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {accuracy}%
                                </div>
                            </div>
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Characters</div>
                                <div className="text-xl font-bold pt-2">
                                    <span className="text-green-400">{userInput.length}</span>
                                    <span className="text-gray-500">/</span>
                                    <span className="text-red-500">{userInput.length - userInput.split('').filter((c,i)=>c===targetText[i]).length}</span>
                                </div>
                            </div>
                        </div>

                        <Button 
                            onClick={startGame} 
                            className="w-full bg-white text-black hover:bg-gray-200 font-bold py-6 text-xl rounded-xl transition-transform hover:scale-[1.02]"
                        >
                            Go Again <RotateCcw className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            )}

        </div>
    );
}