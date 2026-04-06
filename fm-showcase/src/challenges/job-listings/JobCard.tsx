interface JobCardProps {
  job: any; 
  onFilterClick: (tag: string) => void;
}

export default function JobCard({ job, onFilterClick }: JobCardProps) {
  const tags = [job.role, job.level, ...job.languages, ...job.tools];

  return (
    <div className={`relative bg-white rounded-md shadow-md p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between transition-all hover:scale-[1.01] ${job.featured ? 'border-l-[5px] border-primary' : ''}`}>
      
      {/* Sol Kısım: Logo ve Bilgiler */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Mobilde Logo yukarı taşar */}
        <img 
          src={job.logo} 
          alt={job.company} 
          className="w-12 h-12 md:w-[88px] md:h-[88px] absolute -top-6 md:static" 
        />
        
        <div className="mt-4 md:mt-0 flex flex-col gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-primary font-bold text-sm md:text-md">{job.company}</span>
            <div className="flex gap-2">
              {job.new && <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full uppercase pt-1.5">New!</span>}
              {job.featured && <span className="bg-neutral-900 text-white text-xs font-bold px-2 py-1 rounded-full uppercase pt-1.5">Featured</span>}
            </div>
          </div>
          
          <h2 className="text-neutral-900 font-bold text-lg hover:text-primary cursor-pointer transition-colors">
            {job.position}
          </h2>
          
          <div className="flex items-center gap-2 text-neutral-400 text-sm font-medium">
            <span>{job.postedAt}</span> • <span>{job.contract}</span> • <span>{job.location}</span>
          </div>
        </div>
      </div>

      <hr className="my-4 border-neutral-200 md:hidden" />

      {/* Sağ Kısım: Filtre Tag'leri */}
      <div className="flex flex-wrap gap-4 md:justify-end">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onFilterClick(tag)}
            className="bg-neutral-100 text-primary font-bold px-2 py-1.5 rounded hover:bg-primary hover:text-white transition-all text-[13px]"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}