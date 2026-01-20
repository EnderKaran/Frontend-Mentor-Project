import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

//importlar
import smallLogo from "../typing-speed-test/typing-test-images/logo-small.svg"

export default function TypingTest(){
    return(
        <div className="min-h-screen bg-ty-black text-ty-gray-light font-sora p-6 flex flex-col items-center">

            {/* Geri Dön Butonu */}
            <div className="w-full max-w-5xl mb-8">
                <Button asChild variant="ghost" className="text-ty-gray-light hover:text-white hover:bg-ty-gray-dark">
                    <Link to="/" className="flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5" /> 
                        Back to Showcase
                    </Link>
                </Button>
            </div>

            {/* Header / Logo Alanı */}
            <header className="w-full max-w-5xl flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                    <img src= {smallLogo} alt="Logo" className="w-8 h-8" />
                    <h1 className="text-2xl font-bold text-white leading-none pt-1">Typing Speed Test</h1>
                </div>
            </header>

            {/* Test Alanı (Mockup) */}
            <main className="w-full max-w-5xl bg-ty-gray-dark rounded-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
                {/* Arka plan deseni (Confetti) */}
                <div className="absolute top-0 right-0 p-4 opacity-50">
                    {/* <img src="/images/typing-test/pattern-confetti.svg" /> */}
                </div>

                <div className="text-center space-y-6">
                    <h2 className="text-ty-primary text-xl">System Check...</h2>
                        <p className="text-2xl md:text-3xl leading-relaxed text-ty-gray blur-[2px]">
                        The quick brown fox jumps over the lazy dog. 
                        (Font ve Renk Testi)
                        </p>
                    <Button className="bg-ty-primary text-ty-black hover:bg-yellow-300 font-bold px-8 py-6 text-lg rounded-xl">
                    Start Test
                    </Button>
                </div>
            </main>

        </div>
    )
}