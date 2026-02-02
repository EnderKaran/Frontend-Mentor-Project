import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { initialExtensions, type Extension } from "./data";

import logo from "./extension-manager-images/logo.svg";

export default function ExtensionManager() {

    // state yönetimi 
    const [extensions, setExtensions] = useState<Extension[]>(initialExtensions);
    const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Eklenti silme fonksiyonu 
    const removeExtension = (id: number) => {
        setExtensions(extensions.filter((ext) => ext.id !== id));
    };

    const toggleStatus = (id: number) => {
    setExtensions(
      extensions.map((ext) =>
        ext.id === id ? { ...ext, isActive: !ext.isActive } : ext
      )
    );
  };

  const filteredExtensions = extensions.filter((ext) => {
    if (filter === "active") return ext.isActive;
    if (filter === "inactive") return !ext.isActive;
    return true; // "all" durumu
  });


  return (
    // 'dark' class'ını isDarkMode state'ine göre dinamik veriyoruz
    <div className={`${isDarkMode ? "dark" : ""} min-h-screen transition-colors duration-500`}>
      <div className="min-h-screen bg-ext-light-grad dark:bg-ext-dark-grad font-noto p-4 md:p-10 text-ext-900 dark:text-ext-0">
        
        {/* HEADER / NAVIGATION */}
        <nav className="max-w-6xl mx-auto mb-12 flex justify-between items-center bg-white/50 dark:bg-ext-800/50 backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-4">
            <img src={logo} alt="logo" className="w-28 h-16" />
          </div>
          
          <div className="flex items-center gap-3">
            {/* Tema Değiştirici */}
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="rounded-xl border border-white/20 dark:border-white/10"
            >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            <Button asChild variant="outline" className="hidden sm:flex gap-2 rounded-xl border-white/20 dark:border-white/10">
              <Link to="/"><ArrowLeft size={18} /> Back to Hub</Link>
            </Button>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto">
          {/* TITLE & FILTERS */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <h1 className="text-3xl font-bold">Extensions List</h1>
            
            {/* Filtre Butonları (Resimdeki Tasarım) */}
            <div className="flex bg-white dark:bg-ext-800 p-1.5 rounded-full border border-ext-200 dark:border-white/5 shadow-sm">
              {(["all", "active", "inactive"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                    filter === f
                      ? "bg-ext-red text-white shadow-lg"
                      : "text-ext-600 dark:text-ext-300 hover:text-ext-900 dark:hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* EXTENSIONS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExtensions.map((ext) => (
              <div 
                key={ext.id}
                className="group bg-white dark:bg-ext-800 p-6 rounded-[2rem] border border-white dark:border-white/5 shadow-xl shadow-ext-900/5 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                    {/* Card Header (Logo & Info) */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-ext-light-grad dark:bg-ext-700/50 shadow-inner">
                            <img src={ext.logo} alt={ext.name} className="w-10 h-10 object-contain" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold group-hover:text-ext-red transition-colors">{ext.name}</h3>
                            <p className="text-sm text-ext-600 dark:text-ext-300 leading-snug mt-1">
                                {ext.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card Footer (Actions) */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-ext-100 dark:border-white/5">
                    <button 
                        onClick={() => removeExtension(ext.id)}
                        className="text-xs font-bold text-ext-600 dark:text-ext-300 hover:text-ext-red flex items-center gap-1.5 transition-colors"
                    >
                        <Trash2 size={14} /> Remove
                    </button>
                    
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${ext.isActive ? "text-ext-red" : "text-ext-300"}`}>
                            {ext.isActive ? "Active" : "Disabled"}
                        </span>
                        <Switch 
                            checked={ext.isActive} 
                            onCheckedChange={() => toggleStatus(ext.id)}
                            className="data-[state=checked]:bg-ext-red"
                        />
                    </div>
                </div>
              </div>
            ))}
          </div>

          {/* Boş Durum (Empty State) */}
          {filteredExtensions.length === 0 && (
            <div className="text-center py-20 bg-white/30 dark:bg-ext-800/30 rounded-[3rem] border-2 border-dashed border-ext-200 dark:border-white/5">
              <p className="text-ext-600 dark:text-ext-300 text-lg">No extensions found in this category.</p>
              <Button variant="link" onClick={() => setFilter("all")} className="text-ext-red mt-2">
                Show all extensions
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}