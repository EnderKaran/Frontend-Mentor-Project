import { useState, useMemo } from "react";
import { Github, Eye, Code2, Search,Lightbulb } from "lucide-react";
import { Link } from "react-router-dom"; 
import { motion, AnimatePresence } from "framer-motion";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Görsel importları...
import introSectionImage from "../challenges/intro-section/intro-section-images/desktop-design.jpg";
import typingSectionImage from "../challenges/typing-speed-test/typing-test-images/preview.jpg";
import WeatherSectionImage from "../challenges/weather-app/weather-app-image/preview.webp";
import ExtensionSectionImage from "../challenges/extension-manager/extension-manager-images/preview.webp";
import CommentsSectionImage from "../challenges/interactive-comments/interactive-comments-images/preview.webp";
import launchCountdownImage from "../challenges/launch-countdown-timer/launch-countdown-timer-images/preview.webp";
import calculatorAppImage from "../challenges/calculator-app/preview.webp";
import multistepformAppImage from "../challenges/multi-step-form/preview.webp";
import RoomHomePageAppImage from "../challenges/room-homepage/preview.webp";
import ipTrackerImage from "../challenges/ip-address-tracker/preview.jpg";
import jobListingsImage from "../challenges/job-listings/preview.jpg"

const projects = [
  { 
    id: 1, 
    title: "Intro Section", 
    description: "Complex navigation & sidebar.", 
    lessons: "Responsive menu and dropdown logic implementation.", 
    image: introSectionImage, 
    tags: ["React", "Tailwind", "Navigation"], 
    internalLink: "/challenges/intro-section", 
    repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/intro-section", 
    difficulty: "Junior" 
  },
  { 
    id: 2, 
    title: "Typing Test", 
    description: "WPM & accuracy analysis tool.", 
    lessons: "Real-time string comparison algorithms.", 
    image: typingSectionImage, 
    tags: ["React", "State Logic", "Algorithms"], 
    internalLink: "/challenges/typing-speed-test", 
    repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/typing-speed-test", 
    difficulty: "Junior" 
  },
  { 
    id: 3, 
    title: "Weather App", 
    description: "Real-time weather dashboard.", 
    lessons: "Async/Await API fetching and error handling.", 
    image: WeatherSectionImage, 
    tags: ["React", "API", "Tailwind"], 
    internalLink: "/challenges/weather-app", 
    repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/weather-app", 
    difficulty: "Intermediate" 
  },
  { 
    id: 4, 
    title: "Extension Manager", 
    description: "Theme-ready management UI.", 
    lessons: "Effective array filtering and dark mode logic.", 
    image: ExtensionSectionImage, 
    tags: ["React", "Dark Mode", "CRUD"], 
    internalLink: "/challenges/extension-manager", 
    repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/extension-manager", 
    difficulty: "Junior" 
  },
  { 
    id: 5, 
    title: "Interactive Comments", 
    description: "Nested CRUD comment system.", 
    lessons: "Managing nested state and recursive components.", 
    image: CommentsSectionImage, 
    tags: ["React", "Nested State", "LocalStorage"], 
    internalLink: "/challenges/interactive-comments", 
    repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/interactive-comments", 
    difficulty: "Intermediate" 
  },
  { 
    id: 6, 
    title: "Countdown Timer", 
    description: "3D animated countdown app.", 
    lessons: "CSS 3D transforms and precise interval management.", 
    image: launchCountdownImage, 
    tags: ["React", "CSS 3D", "Time Logic"], 
    internalLink: "/challenges/launch-countdown", 
    repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/Launch-countdown-timer", 
    difficulty: "Intermediate" 
  },
  { 
    id: 7, 
    title: "Calculator App", 
    description: "Multi-theme scientific calculator.", 
    lessons: "Advanced state management with useReducer.", 
    image: calculatorAppImage, 
    tags: ["React", "useReducer", "A11y"], 
    internalLink: "/challenges/calculator", 
    repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/calculator-app", 
    difficulty: "Intermediate" 
  },
  { 
    id: 8, 
    title: "Multi-step Form", 
    description: "Advanced form with validation.", 
    lessons: "Context API for data persistence across steps.", 
    image: multistepformAppImage, 
    tags: ["React", "Context API", "Validation"], 
    internalLink: "/challenges/multi-step-form", 
    repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/multi-step-form", 
    difficulty: "Advanced" 
  },
  { 
    id: 9, 
    title: "Room Homepage", 
    description: "E-commerce landing with slider.", 
    lessons: "Accessible slider logic and complex Grid layouts.", 
    image: RoomHomePageAppImage, 
    tags: ["React", "CSS Grid", "A11y"], 
    internalLink: "/challenges/room-homepage", 
    repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/room-homepage", 
    difficulty: "Intermediate" 
  },
    { 
    id: 10, 
    title: "IP Address Tracker", 
    description: "Real-time IP and domain tracking app with interactive maps.", 
    lessons: "Handling async IP geolocation data and third-party map integration.", 
    image: ipTrackerImage, 
    tags: ["React", "API", "Leaflet"], 
    internalLink: "/challenges/ip-address-tracker", 
    repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/ip-address-tracker", 
    difficulty: "Intermediate" 
  },
  { 
  id: 11, 
  title: "Job Listings with Filtering", 
  description: "Dynamic job board with a complex multi-tag filtering system.", 
  lessons: "Advanced array filtering (AND logic) and mobile-first responsive component architecture.", 
  image: jobListingsImage,
  tags: ["React", "Tailwind CSS", "JSON"], 
  internalLink: "/challenges/job-listings", 
  repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/job-listings", 
  difficulty: "Intermediate" 
}
];

function ProjectCard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => techs.add(t)));
    return ["All", ...Array.from(techs).sort()];
  }, []);

  const stats = useMemo(() => {
    const totalCompleted = projects.length;
    const difficultyCounts = projects.reduce((acc: any, p) => { acc[p.difficulty] = (acc[p.difficulty] || 0) + 1; return acc; }, {});
    const techCounts = projects.reduce((acc: any, p) => { p.tags.forEach(tag => { acc[tag] = (acc[tag] || 0) + 1; }); return acc; }, {});
    const sortedTech = Object.entries(techCounts).sort(([, a]: any, [, b]: any) => b - a).slice(0, 4);
    return { totalCompleted, totalGoal: 125, difficultyCounts, sortedTech };
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = selectedDifficulty === "All" || project.difficulty === selectedDifficulty;
      const matchesTech = selectedTech === "All" || project.tags.includes(selectedTech);
      return matchesSearch && matchesDifficulty && matchesTech;
    });
  }, [searchQuery, selectedDifficulty, selectedTech]);

  return (
    <div className="min-h-screen font-sans bg-neutral-950 text-neutral-100 selection:bg-indigo-500 selection:text-white">
      {/* HEADER */}
      <header className="container px-4 pt-16 pb-8 mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-indigo-400 border rounded-full bg-indigo-500/10 border-indigo-500/20">
          <Code2 className="w-4 h-4" /> <span>Frontend Mentor Challenges</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-transparent bg-linear-to-r from-white to-neutral-500 bg-clip-text">My Coding Journey</h1>
      </header>

      {/* DASHBOARD STATS */}
      <section className="container px-4 mb-8 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl bg-neutral-900/40 border-neutral-800">
          <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Progress</p>
          <h3 className="text-3xl font-black mt-2">{stats.totalCompleted} <span className="text-neutral-600">/ {stats.totalGoal}</span></h3>
          <div className="w-full bg-neutral-800 h-1.5 mt-4 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(stats.totalCompleted / stats.totalGoal) * 100}%` }} className="bg-indigo-500 h-full" transition={{ duration: 1.5 }} />
          </div>
        </div>
        <div className="p-6 border rounded-xl bg-neutral-900/40 border-neutral-800 flex flex-wrap gap-4">
            {['Junior', 'Intermediate', 'Advanced'].map(l => (
              <div key={l}><p className="text-neutral-500 text-[10px] uppercase font-bold">{l}</p><p className="text-white font-bold">{stats.difficultyCounts[l] || 0}</p></div>
            ))}
        </div>
        <div className="p-6 border rounded-xl bg-neutral-900/40 border-neutral-800 space-y-2">
            {stats.sortedTech.map(([t, c]: any) => (
              <div key={t} className="flex justify-between items-center text-xs"><span className="text-neutral-400">{t}</span><span className="text-indigo-400 font-bold">{c}</span></div>
            ))}
        </div>
      </section>

      {/* FILTERS */}
      <section className="container px-4 mb-12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-xl bg-neutral-900/50 border-neutral-800">
          <div className="relative flex items-center"><Search className="absolute left-3 w-4 h-4 text-neutral-500" /><input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg outline-none focus:border-indigo-500" /></div>
          <select value={selectedDifficulty} onChange={e => setSelectedDifficulty(e.target.value)} className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"><option value="All">All Difficulties</option><option value="Junior">Junior</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option></select>
          <select value={selectedTech} onChange={e => setSelectedTech(e.target.value)} className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500">{allTechs.map(t => <option key={t} value={t}>{t}</option>)}</select>
      </section>

      {/* GRID */}
      <main className="container px-4 pb-20 mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} onClick={() => setSelectedProject(p)}>
                <Card className="flex flex-col h-full bg-neutral-900 border-neutral-800 hover:border-indigo-500/50 cursor-pointer group transition-all">
                  <div className="relative h-48 overflow-hidden bg-neutral-800 rounded-t-xl">
                    <img src={p.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <Badge className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border-none">{p.difficulty}</Badge>
                  </div>
                  <CardHeader><CardTitle className="text-lg">{p.title}</CardTitle><div className="flex flex-wrap gap-2 mt-1">{p.tags.map(t => <Badge key={t} variant="outline" className="text-[10px] text-neutral-500">{t}</Badge>)}</div></CardHeader>
                  <CardFooter className="grid grid-cols-2 gap-2 pt-4 border-t border-neutral-800/50" onClick={e => e.stopPropagation()}>
                    <Button asChild variant="ghost" size="sm" className="hover:bg-neutral-800"><a href={p.repoLink} target="_blank"><Github className="w-4 h-4 mr-2" /> Code</a></Button>
                    <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700"><Link to={p.internalLink}><Eye className="w-4 h-4 mr-2" /> Page</Link></Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* PREVIEW DIALOG */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl bg-neutral-900 border-neutral-800 p-0 overflow-hidden text-neutral-100">
          <div className="grid md:grid-cols-2">
            <div className="h-64 md:h-full bg-neutral-800"><img src={selectedProject?.image} className="w-full h-full object-cover" /></div>
            <div className="p-8 space-y-6">
              <DialogHeader><DialogTitle className="text-2xl font-bold">{selectedProject?.title}</DialogTitle><div className="flex gap-2 mt-2">{selectedProject?.tags.map((t: string) => <Badge key={t} variant="secondary" className="bg-indigo-500/10 text-indigo-400 border-none text-[10px]">{t}</Badge>)}</div></DialogHeader>
              <div className="space-y-4">
                <div><p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-1">Overview</p><p className="text-sm text-neutral-400">{selectedProject?.description}</p></div>
                <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/10"><p className="text-[10px] uppercase font-bold text-indigo-400 mb-2 flex items-center gap-2"><Lightbulb className="w-3 h-3" /> Technical Lesson</p><p className="text-sm italic text-neutral-300">"{selectedProject?.lessons}"</p></div>
              </div>
              <div className="flex gap-4 pt-4"><Button asChild className="flex-1 bg-indigo-600 hover:bg-indigo-700"><Link to={selectedProject?.internalLink || "#"}>Open Live View</Link></Button><Button asChild variant="outline" className="flex-1 border-neutral-800"><a href={selectedProject?.repoLink} target="_blank">View Repo</a></Button></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProjectCard;