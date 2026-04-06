import { useState } from "react";
import { jobData, type Job } from "./data";
import Header from "./Header";
import FilterBar from "./FilterBar";
import JobCard from "./JobCard";

export default function JobBoard() {
  const [filters, setFilters] = useState<string[]>([]);

  // Yeni filtre ekleme
  const addFilter = (tag: string) => {
    if (!filters.includes(tag)) {
      setFilters([...filters, tag]);
    }
  };

  // Tekil filtre silme
  const removeFilter = (tagToRemove: string) => {
    setFilters(filters.filter((tag) => tag !== tagToRemove));
  };

  // Tüm filtreleri temizleme
  const clearFilters = () => setFilters([]);

  // Filtreleme Mantığı: Seçilen TÜM filtreler ilanda var mı?
  const filteredJobs = jobData.filter((job: Job) => {
    const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
    return filters.every((filter) => jobTags.includes(filter));
  });

  return (
    <div className="min-h-screen !bg-job-bg font-spartan pb-20">
      <Header />
      <main className="max-w-[1110px] mx-auto px-6 relative">
        <FilterBar filters={filters} onRemove={removeFilter} onClear={clearFilters} />
        
        {/* Margin ayarı: Filtre barı varken mt-10, yokken mt-14 */}
        <div className={`flex flex-col gap-10 md:gap-6 ${filters.length > 0 ? "mt-10" : "mt-14"}`}>
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onFilterClick={addFilter} />
          ))}
        </div>
      </main>
    </div>
  );
}