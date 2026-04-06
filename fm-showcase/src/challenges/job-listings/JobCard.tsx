interface JobCardProps {
  job: any;
  onFilterClick: (tag: string) => void;
}

export default function JobCard({ job, onFilterClick }: JobCardProps) {
  const tags = [job.role, job.level, ...job.languages, ...job.tools];

  return (
    <div
      className={`relative bg-white rounded-md shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 pt-10 md:p-8 transition-all hover:shadow-xl ${
        job.featured ? "border-l-[5px] border-job-primary" : ""
      }`}
    >
      {/* Sol Kısım */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Logo: Mobilde dışarı taşar, Desktop'ta normal  */}
        <img
          src={job.logo}
          alt={job.company}
          className="w-12 h-12 md:w-[88px] md:h-[88px] absolute -top-6 left-6 md:static rounded-full"
        />

        <div className="mt-2 md:mt-0">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-job-primary font-bold text-sm md:text-base">{job.company}</span>
            <div className="flex gap-2">
              {job.new && (
                <span className="bg-job-primary text-white text-[11px] font-bold px-2 py-1 rounded-full uppercase pt-1">
                  New!
                </span>
              )}
              {job.featured && (
                <span className="bg-job-dark text-white text-[11px] font-bold px-2 py-1 rounded-full uppercase pt-1">
                  Featured
                </span>
              )}
            </div>
          </div>

          <h2 className="text-job-dark font-bold text-base md:text-lg hover:text-job-primary cursor-pointer transition-colors mb-2">
            {job.position}
          </h2>

          <div className="flex items-center gap-2 text-job-gray text-sm font-medium">
            <span>{job.postedAt}</span> • <span>{job.contract}</span> • <span>{job.location}</span>
          </div>
        </div>
      </div>

      <hr className="w-full border-neutral-200 md:hidden" />

      {/* Etiketler  */}
      <div className="flex flex-wrap gap-4 md:justify-end">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onFilterClick(tag)}
            className="bg-job-bg text-job-primary font-bold px-3 py-1.5 rounded hover:bg-job-primary hover:text-white transition-all text-[13px]"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}