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
import ExtensionSectionImage from "../challenges/extension-manager/extension-manager-images/preview.webp";
import CommentsSectionImage from "../challenges/interactive-comments/interactive-comments-images/preview.webp";

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
{
  id: 4,
  title: "Extension Manager UI",
  description: "Eklentileri yönetmek, filtrelemek ve silmek için tasarlanmış modern, çoklu tema destekli yönetim paneli.",
  image: ExtensionSectionImage,
  tags: ["React", "Filtering", "Dark Mode", "CRUD"],
  internalLink: "/challenges/extension-manager",
  repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/extension-manager",
  difficulty: "Junior",
},
{
  id: 5,
  title: "Interactive Comments Section",
  description: "İç içe geçmiş yorum yapısı, oylama sistemi ve tam CRUD (Ekleme, Düzenleme, Silme) özelliklerine sahip gelişmiş etkileşimli panel.",
  image: CommentsSectionImage,
  tags: ["React", "Nested State", "CRUD", "LocalStorage"],
  internalLink: "/challenges/interactive-comments",
  repoLink: "https://github.com/EnderKaran/Frontend-Mentor-Project/tree/main/fm-showcase/src/challenges/interactive-comments",
  difficulty: "Intermediate",
}
];

function ProjectCard() {
  return (
    <div className="min-h-screen font-sans bg-neutral-950 text-neutral-100 selection:bg-indigo-500 selection:text-white">
      {/* HEADER SECTION */}
      <header className="container px-4 py-16 mx-auto space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium text-indigo-400 border rounded-full bg-indigo-500/10 border-indigo-500/20">
          <Code2 className="w-4 h-4" />
          <span>Frontend Mentor Challenges</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-transparent md:text-6xl bg-linear-to-r from-white to-neutral-400 bg-clip-text">
          My Coding Journey
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-neutral-400">
          A collection of designs I've solved on Frontend Mentor. 
        </p>
      </header>

      {/* GRID SECTION */}
      <main className="container px-4 pb-20 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="flex flex-col overflow-hidden transition-all duration-300 bg-neutral-900 border-neutral-800 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 group"
            >
              {/* Image Area */}
              <div className="relative w-full h-48 overflow-hidden bg-neutral-800">
                {project.image ? (
                   <img 
                     src={project.image} 
                     alt={project.title} 
                     className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                   />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-700">
                    <span className="text-sm">Görsel Yok</span>
                  </div>
                )}
                
                <div className="absolute top-3 right-3">
                   <Badge variant="secondary" className="text-white border-none bg-black/60 backdrop-blur-md hover:bg-black/80">
                      {project.difficulty}
                   </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-neutral-100">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs text-neutral-400 border-neutral-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="grow">
                <CardDescription className="leading-relaxed text-neutral-400">
                  {project.description}
                </CardDescription>
              </CardContent>

              <CardFooter className="grid grid-cols-2 gap-3 pt-0">
                {/* REPO BUTTON */}
                <Button asChild variant="outline" className="w-full cursor-pointer border-neutral-700 hover:bg-neutral-800 hover:text-white text-neutral-300">
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" /> Code
                  </a>
                </Button>

                {/* PROJECT BUTTON */}
                <Button asChild className="w-full text-white bg-indigo-600 border-0 cursor-pointer hover:bg-indigo-700">
                  <Link to={project.internalLink}>
                    <Eye className="w-4 h-4 mr-2" /> Go to Page
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      
      {/* FOOTER */}
      <footer className="py-8 text-sm text-center border-t border-neutral-800 text-neutral-500">
        <p>© {new Date().getFullYear()} Frontend Mentor Portfolio. Built with React & Shadcn UI.</p>
      </footer>
    </div>
  );
}

export default ProjectCard;