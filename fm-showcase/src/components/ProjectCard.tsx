import { useState, useMemo } from "react";
import { Github, Eye, Code2, Search, Filter, X } from "lucide-react";
import { Link } from "react-router-dom"; 
import { motion, AnimatePresence } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Görsel importlarını olduğu gibi koruyoruz...
import introSectionImage from "../challenges/intro-section/intro-section-images/desktop-design.jpg";
import typingSectionImage from "../challenges/typing-speed-test/typing-test-images/preview.jpg";
import WeatherSectionImage from "../challenges/weather-app/weather-app-image/preview.webp";
import ExtensionSectionImage from "../challenges/extension-manager/extension-manager-images/preview.webp";
import CommentsSectionImage from "../challenges/interactive-comments/interactive-comments-images/preview.webp";
import launchCountdownImage from "../challenges/launch-countdown-timer/launch-countdown-timer-images/preview.webp";
import calculatorAppImage from "../challenges/calculator-app/preview.webp";
import multistepformAppImage from "../challenges/multi-step-form/preview.webp";
import RoomHomePageAppImage from "../challenges/room-homepage/preview.webp";

const projects = [
  { id: 1, title: "Intro Section with Dropdown", description: "Complex navigation, dropdown menus and responsive sidebar.", image: introSectionImage, tags: ["React", "Tailwind", "Navigation"], internalLink: "/challenges/intro-section", repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/intro-section", difficulty: "Junior" },
  { id: 2, title: "Typing Speed Test", description: "Anlık doğruluk analizi, WPM hesaplama ve oyun modları içeren gelişmiş bir yazma testi uygulaması.", image: typingSectionImage, tags: ["React", "State Logic", "Algorithms"], internalLink: "/challenges/typing-speed-test", repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/typing-speed-test", difficulty: "Junior" },
  { id: 3, title: "Weather App", description: "Open-Meteo API kullanarak anlık, saatlik ve 7 günlük hava durumu verilerini sunan, birim dönüştürme özellikli modern arayüz.", image: WeatherSectionImage, tags: ["React", "API", "Async/Await", "Tailwind"], internalLink: "/challenges/weather-app", repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/weather-app", difficulty: "Intermediate" },
  { id: 4, title: "Extension Manager UI", description: "Eklentileri yönetmek, filtrelemek ve silmek için tasarlanmış modern, çoklu tema destekli yönetim paneli.", image: ExtensionSectionImage, tags: ["React", "Filtering", "Dark Mode", "CRUD"], internalLink: "/challenges/extension-manager", repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/extension-manager", difficulty: "Junior" },
  { id: 5, title: "Interactive Comments Section", description: "İç içe geçmiş yorum yapısı, oylama sistemi ve tam CRUD (Ekleme, Düzenleme, Silme) özelliklerine sahip gelişmiş etkileşimli panel.", image: CommentsSectionImage, tags: ["React", "Nested State", "CRUD", "LocalStorage"], internalLink: "/challenges/interactive-comments", repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/interactive-comments", difficulty: "Intermediate" },
  { id: 6, title: "Launch Countdown Timer", description: "Gelişmiş zaman yönetimi mantığı ve özel CSS Keyframes ile kurgulanmış 3D flip card animasyonları içeren 14 günlük geri sayım uygulaması.", image: launchCountdownImage, tags: ["React", "CSS Keyframes", "3D Animation", "Time Logic"], internalLink: "/challenges/launch-countdown", repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/Launch-countdown-timer", difficulty: "Intermediate" },
  { id: 7, title: "Calculator App", description: "Üç farklı tema desteği (Multi-theme), TypeScript ile kurgulanmış gelişmiş state yönetimi (useReducer) ve erişilebilir radyo buton mimarisi içeren hesap makinesi.", image: calculatorAppImage, tags: ["React", "TypeScript", "useReducer", "CSS Variables", "A11y"], internalLink: "/challenges/calculator", repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/calculator-app", difficulty: "Intermediate" },
  { id: 8, title: "Multi-step Form", description: "Dinamik validasyon mantığı, adımlar arası veri koruma (Context API) ve aylık/yıllık abonelik geçişlerine göre güncellenen interaktif özet ekranı içeren gelişmiş form mimarisi.", image: multistepformAppImage, tags: ["React", "TypeScript", "Context API", "Tailwind CSS", "Form Validation"], internalLink: "/challenges/multi-step-form", repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/multi-step-form", difficulty: "Advanced" },
  { id: 9, title: "Room Homepage", description: "Dinamik slider mekanizması, klavye ile navigasyon desteği ve karmaşık Grid yapıları içeren, responsive tasarımıyla öne çıkan modern bir e-ticaret açılış sayfası.", image: RoomHomePageAppImage, tags: ["React", "Tailwind CSS", "Keyboard Navigation", "CSS Grid", "Responsive Design"], internalLink: "/challenges/room-homepage", repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/room-homepage", difficulty: "Intermediate" }
];

function ProjectCard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTech, setSelectedTech] = useState("All");

  // Dinamik olarak benzersiz teknolojileri topluyoruz
  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => techs.add(t)));
    return ["All", ...Array.from(techs).sort()];
  }, []);

  // İstatistik Hesaplama Mantığı
  const stats = useMemo(() => {
    const totalCompleted = projects.length;
    const totalGoal = 122; 
    const difficultyCounts = projects.reduce((acc: any, p) => {
      acc[p.difficulty] = (acc[p.difficulty] || 0) + 1;
      return acc;
    }, {});
    const techCounts = projects.reduce((acc: any, p) => {
      p.tags.forEach(tag => { acc[tag] = (acc[tag] || 0) + 1; });
      return acc;
    }, {});
    const sortedTech = Object.entries(techCounts)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 4);
    return { totalCompleted, totalGoal, difficultyCounts, sortedTech };
  }, []);

  // Filtreleme mantığı
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = selectedDifficulty === "All" || project.difficulty === selectedDifficulty;
      const matchesTech = selectedTech === "All" || project.tags.includes(selectedTech);
      return matchesSearch && matchesDifficulty && matchesTech;
    });
  }, [searchQuery, selectedDifficulty, selectedTech]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedDifficulty("All");
    setSelectedTech("All");
  };

  return (
    <div className="min-h-screen font-sans bg-neutral-950 text-neutral-100 selection:bg-indigo-500 selection:text-white">
      {/* HEADER SECTION */}
      <header className="container px-4 pt-16 pb-8 mx-auto space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium text-indigo-400 border rounded-full bg-indigo-500/10 border-indigo-500/20">
          <Code2 className="w-4 h-4" />
          <span>Frontend Mentor Challenges</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-transparent md:text-6xl bg-linear-to-r from-white to-neutral-400 bg-clip-text">
          My Coding Journey
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-neutral-400 font-medium">
          A dedicated pursuit of excellence through 122 challenges.
        </p>
      </header>

      {/* PROGRESS TRACKER DASHBOARD */}
      <section className="container px-4 mb-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-xl bg-neutral-900/40 border-neutral-800 flex flex-col justify-center">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-neutral-500 text-xs uppercase tracking-widest font-bold">Total Progress</p>
                <h3 className="text-4xl font-black text-white mt-1">{stats.totalCompleted} <span className="text-neutral-600 text-xl">/ {stats.totalGoal}</span></h3>
              </div>
              <div className="text-indigo-400 font-mono text-sm">{Math.round((stats.totalCompleted / stats.totalGoal) * 100)}%</div>
            </div>
            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(stats.totalCompleted / stats.totalGoal) * 100}%` }}
                className="bg-indigo-500 h-full"
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="p-6 border rounded-xl bg-neutral-900/40 border-neutral-800">
            <p className="text-neutral-500 text-xs uppercase tracking-widest font-bold mb-4">Challenge Levels</p>
            <div className="grid grid-cols-2 gap-4">
              {['Junior', 'Intermediate', 'Advanced'].map((level) => (
                <div key={level} className="flex flex-col">
                  <span className="text-neutral-400 text-xs">{level}</span>
                  <span className="text-white font-bold">{stats.difficultyCounts[level] || 0}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border rounded-xl bg-neutral-900/40 border-neutral-800">
            <p className="text-neutral-500 text-xs uppercase tracking-widest font-bold mb-3">Top Technologies</p>
            <div className="space-y-3">
              {stats.sortedTech.map(([tech, count]: any) => (
                <div key={tech} className="space-y-1">
                  <div className="flex justify-between text-[10px] uppercase tracking-tighter">
                    <span className="text-neutral-300">{tech}</span>
                    <span className="text-neutral-500">{Math.round((count / stats.totalCompleted) * 100)}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / stats.totalCompleted) * 100}%` }}
                      className="bg-neutral-400 h-full"
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FILTER CONTROL PANEL */}
      <section className="container px-4 mb-12 mx-auto">
        <div className="p-6 border rounded-xl bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="relative group">
              <Search className="absolute w-4 h-4 transition-colors left-3 top-3 text-neutral-500 group-focus-within:text-indigo-400" />
              <input 
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 transition-all border rounded-lg outline-none bg-neutral-950 border-neutral-800 focus:border-indigo-500/50 text-neutral-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-500" />
              <select 
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full py-2 px-3 transition-all border rounded-lg outline-none bg-neutral-950 border-neutral-800 focus:border-indigo-500/50 text-neutral-200 cursor-pointer"
              >
                <option value="All">All Difficulties</option>
                <option value="Junior">Junior</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-neutral-500" />
              <select 
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full py-2 px-3 transition-all border rounded-lg outline-none bg-neutral-950 border-neutral-800 focus:border-indigo-500/50 text-neutral-200 cursor-pointer"
              >
                {allTechs.map(tech => (
                  <option key={tech} value={tech}>{tech === "All" ? "All Technologies" : tech}</option>
                ))}
              </select>
            </div>
          </div>
          {(searchQuery || selectedDifficulty !== "All" || selectedTech !== "All") && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-neutral-800">
              <span className="text-xs font-semibold uppercase text-neutral-500">Active Filters:</span>
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 px-2 text-xs text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
                <X className="w-3 h-3 mr-1" /> Reset All
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* GRID SECTION WITH FRAMER MOTION */}
      <main className="container px-4 pb-20 mx-auto">
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, ease: "circOut" }}
              >
                <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 bg-neutral-900 border-neutral-800 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 group">
                  <div className="relative w-full h-48 overflow-hidden bg-neutral-800">
                    {project.image ? (
                       <img src={project.image} alt={project.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-neutral-700"><span className="text-sm">Görsel Yok</span></div>
                    )}
                    <div className="absolute top-3 right-3">
                       <Badge variant="secondary" className="text-white border-none bg-black/60 backdrop-blur-md hover:bg-black/80">{project.difficulty}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-neutral-100">{project.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs text-neutral-400 border-neutral-700">{tag}</Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="grow">
                    <CardDescription className="leading-relaxed text-neutral-400">{project.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="grid grid-cols-2 gap-3 pt-0">
                    <Button asChild variant="outline" className="w-full cursor-pointer border-neutral-700 hover:bg-neutral-800 hover:text-white text-neutral-300">
                      <a href={project.repoLink} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4 mr-2" /> Code</a>
                    </Button>
                    <Button asChild className="w-full text-white bg-indigo-600 border-0 cursor-pointer hover:bg-indigo-700">
                      <Link to={project.internalLink}><Eye className="w-4 h-4 mr-2" /> Go to Page</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-4 mb-4 rounded-full bg-neutral-900 border border-neutral-800"><Search className="w-8 h-8 text-neutral-700" /></div>
            <h3 className="text-xl font-semibold text-neutral-300">No projects found</h3>
            <p className="mt-2 text-neutral-500">Try adjusting your filters or search query.</p>
            <Button variant="link" onClick={resetFilters} className="mt-4 text-indigo-400">Clear all filters</Button>
          </motion.div>
        )}
      </main>
      
      <footer className="py-8 text-sm text-center border-t border-neutral-800 text-neutral-500">
        <p>© {new Date().getFullYear()} Frontend Mentor Portfolio. Built with React, Shadcn UI & Framer Motion.</p>
      </footer>
    </div>
  );
}

export default ProjectCard;