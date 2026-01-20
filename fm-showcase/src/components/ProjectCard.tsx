import { Github, Eye, Code2 } from "lucide-react";
import { Link } from "react-router-dom"; 
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

//images
import introSectionImage from "../challenges/intro-section/intro-section-images/desktop-design.jpg";
import typingSectionImage from "../challenges/typing-speed-test/typing-test-images/preview.jpg";
import WeatherSectionImage from "../challenges/weather-app/weather-app-image/preview.webp";

const projects = [
  {
    id: 1, 
    title: "Intro Section with Dropdown",
    description: "Complex navigation, dropdown menus and responsive sidebar.",
    image: introSectionImage,
    tags: ["React", "Tailwind", "Navigation"],
    internalLink: "/challenges/intro-section", 
    repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/intro-section", 
    difficulty: "Junior",
  },
  {
    id: 2,
    title: "Typing Speed Test",
    description: "Anlık doğruluk analizi, WPM hesaplama ve oyun modları içeren gelişmiş bir yazma testi uygulaması.",
    image: typingSectionImage,
    tags: ["React", "State Logic", "Algorithms"],
    internalLink: "/challenges/typing-speed-test",
    repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/typing-speed-test",
    difficulty: "Junior",
  },
  {
    id: 3,
    title: "Weather App",
    description: "Open-Meteo API kullanarak anlık, saatlik ve 7 günlük hava durumu verilerini sunan, birim dönüştürme özellikli modern arayüz.",
    image: WeatherSectionImage,
    tags: ["React", "API", "Async/Await", "Tailwind"],
    internalLink: "/challenges/weather-app",
    repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/weather-app",
    difficulty: "Intermediate",
},
];

function ProjectCard() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* HEADER SECTION */}
      <header className="container mx-auto py-16 px-4 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium border border-indigo-500/20 mb-4">
          <Code2 className="w-4 h-4" />
          <span>Frontend Mentor Challenges</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
          My Coding Journey
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
          A collection of designs I've solved on Frontend Mentor. 
        </p>
      </header>

      {/* GRID SECTION */}
      <main className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="bg-neutral-900 border-neutral-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col overflow-hidden group"
            >
              {/* Image Area */}
              <div className="relative h-48 w-full bg-neutral-800 overflow-hidden">
                {project.image ? (
                   <img 
                     src={project.image} 
                     alt={project.title} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-700">
                    <span className="text-sm">Görsel Yok</span>
                  </div>
                )}
                
                <div className="absolute top-3 right-3">
                   <Badge variant="secondary" className="bg-black/60 backdrop-blur-md text-white border-none hover:bg-black/80">
                      {project.difficulty}
                   </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-neutral-100">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-neutral-400 border-neutral-700 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <CardDescription className="text-neutral-400 leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardContent>

              <CardFooter className="grid grid-cols-2 gap-3 pt-0">
                {/* REPO BUTTON */}
                <Button asChild variant="outline" className="w-full border-neutral-700 hover:bg-neutral-800 hover:text-white text-neutral-300 cursor-pointer">
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Code
                  </a>
                </Button>

                {/* PROJECT BUTTON */}
                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-0 cursor-pointer">
                  <Link to={project.internalLink}>
                    <Eye className="mr-2 h-4 w-4" /> Go to Page
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      
      {/* FOOTER */}
      <footer className="border-t border-neutral-800 py-8 text-center text-neutral-500 text-sm">
        <p>© {new Date().getFullYear()} Frontend Mentor Portfolio. Built with React & Shadcn UI.</p>
      </footer>
    </div>
  );
}

export default ProjectCard;