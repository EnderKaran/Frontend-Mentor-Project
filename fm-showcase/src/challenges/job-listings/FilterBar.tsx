interface FilterBarProps {
  filters: string[];
  onRemove: (filter: string) => void;
  onClear: () => void;
}

export default function FilterBar({ filters, onRemove, onClear }: FilterBarProps) {
  if (filters.length === 0) return null;

  return (
    <div className="max-w-[1110px] mx-auto px-6 relative z-30 -mt-9">
      <div className="bg-white rounded-md shadow-xl p-5 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4">
          {filters.map((filter) => (
            <div key={filter} className="flex items-center overflow-hidden rounded bg-job-bg">
              <span className="text-job-primary font-bold px-3 py-1 text-[13px]">{filter}</span>
              <button
                onClick={() => onRemove(filter)}
                className="bg-job-primary hover:bg-job-dark transition-colors p-2.5"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.228 0L7 4.228 2.772 0 0 2.772 4.228 7 0 11.228 2.772 14 7 9.772 11.228 14 14 11.228 9.772 7 14 2.772 11.228 0Z" fill="white"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={onClear}
          className="text-job-gray font-bold hover:text-job-primary hover:underline transition-all text-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );
}