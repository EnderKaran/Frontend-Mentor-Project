interface ProjectCardProps {
    title: string;
    imageUrl: string;
    techStack: string[];
  }
  
  const ProjectCard = ({ title, imageUrl, techStack }: ProjectCardProps) => {
    return (
      // Kartın ana çerçevesi
      <div className="w-full max-w-[350px] bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-default">
        
        {/* Görsel Alanı */}
        <div className="h-48 overflow-hidden bg-gray-100 relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-top"
          />
          {/* Görselin üzerine gelince hafif bir parlama efekti */}
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
        </div>
  
        {/* İçerik Alanı */}
        <div className="p-5">
          
          {/* Başlık */}
          <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug">
            {title}
          </h3>
  
          {/* Teknoloji Etiketleri */}
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-[11px] font-semibold bg-blue-50 text-blue-600 rounded-md border border-blue-100 tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>
          
        </div>
      </div>
    );
  };
  
  export default ProjectCard;