import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { initialExtensions, type Extension } from "./data";
import logo from "./extension-manager-images/logo.svg";

export default function ExtensionManager() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.theme === 'dark' || 
           (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  const [extensions, setExtensions] = useState<Extension[]>(initialExtensions);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const removeExtension = (id: number) => {
    setExtensions(extensions.filter((ext) => ext.id !== id));
  };

  const toggleStatus = (id: number) => {
    setExtensions(extensions.map((ext) =>
      ext.id === id ? { ...ext, isActive: !ext.isActive } : ext
    ));
  };

  const filteredExtensions = extensions.filter((ext) => {
    if (filter === "active") return ext.isActive;
    if (filter === "inactive") return !ext.isActive;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F3F7FF] dark:bg-[#040918] font-noto transition-colors duration-500 text-slate-900 dark:text-white">
      
      {/* HEADER / NAVBAR */}
      <header className="w-full px-4 pt-6 md:pt-10">
        <nav className="max-w-6xl mx-auto flex justify-between items-center bg-white dark:bg-[#0F172A] p-4 md:px-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl">
          <div className="flex items-center">

            <img src={logo} alt="logo" className="w-24 md:w-32 h-auto dark:brightness-125" />
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </Button>
            
            <Button asChild variant="outline" className="rounded-2xl border-slate-200 dark:border-white/10 hover:bg-red-500 hover:text-white transition-all">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft size={18} /> 
                <span className="hidden sm:inline font-bold">Back to Hub</span>
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        
        {/* BAŞLIK VE FİLTRELER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">Extensions List</h1>
          
          <div className="flex bg-white dark:bg-[#0F172A] p-1.5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-inner">
            {(["all", "active", "inactive"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 md:px-8 py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                  filter === f
                    ? "bg-[#F23030] text-white shadow-lg shadow-red-500/40 scale-105"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* EKLENTİ KARTLARI (GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredExtensions.map((ext) => (
            <div 
              key={ext.id}
              className={`group relative bg-white dark:bg-[#1E293B] p-6 md:p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col justify-between shadow-lg
                ${ext.isActive 
                    ? "border-transparent hover:shadow-red-500/10 hover:-translate-y-2" 
                    : "border-transparent opacity-60 grayscale-[0.4]"
                } dark:border-white/5`}
            >
              <div>
                <div className="flex items-start gap-5 mb-6">
                  {/* Logo Arka Planı */}
                  <div className="p-4 rounded-[1.5rem] bg-slate-50 dark:bg-slate-700 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <img src={ext.logo} alt={ext.name} className="w-10 h-10 object-contain" />
                  </div>
                  <div className="flex-1">
                    
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-[#F23030] transition-colors">{ext.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium mt-1">
                      {ext.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* ALT AKSİYONLAR */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
                <button 
                  onClick={() => removeExtension(ext.id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-[#F23030] hover:text-white transition-all flex items-center gap-2"
                >
                  <Trash2 size={14} /> Remove
                </button>
                
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${ext.isActive ? "text-[#F23030]" : "text-slate-400 dark:text-slate-600"}`}>
                    {ext.isActive ? "Active" : "Disabled"}
                  </span>
                  <Switch 
                    checked={ext.isActive} 
                    onCheckedChange={() => toggleStatus(ext.id)}
                    // Switch renkleri
                    className="data-[state=checked]:bg-[#F23030] data-[state=unchecked]:bg-slate-200 dark:data-[state=unchecked]:bg-slate-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExtensions.length === 0 && (
          <div className="text-center py-32 rounded-[3.5rem] border-4 border-dashed border-slate-200 dark:border-white/10 animate-in fade-in zoom-in-95">
            <h2 className="text-2xl font-black text-slate-400 dark:text-slate-600">Nothing to show here...</h2>
            <Button 
                variant="link" 
                onClick={() => setFilter("all")} 
                className="text-[#F23030] mt-4 font-extrabold text-lg hover:no-underline hover:scale-110 transition-transform"
            >
                View All Extensions
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}