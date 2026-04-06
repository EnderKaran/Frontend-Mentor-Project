interface FilterBarProps {
    filters: string[];
    onRemove: (filter: string) => void;
    onClear: () => void;
}

export default function FilterBar({ filters, onRemove, onClear }: FilterBarProps) {
  if (filters.length === 0) return null;

  return (
    <div className="max-w-[1110px] mx-auto px-6 relative z-10 -mt-9">
      <div className="bg-white rounded-md shadow-lg p-5 flex items-center justify-between">
        <div className="flex flex-wrap gap-4">
          {filters.map((filter) => (
            <div key={filter} className="flex items-center overflow-hidden rounded">
              <span className="bg-neutral-100 text-primary font-bold px-2 py-1 text-[13px]">
                {filter}
              </span>
              <button 
                onClick={() => onRemove(filter)}
                className="bg-primary hover:bg-neutral-900 transition-colors p-2"
              >
                <img src="./images/icon-remove.svg" alt="Remove" />
              </button>
            </div>
          ))}
        </div>
        <button 
          onClick={onClear}
          className="text-neutral-500 font-bold hover:text-primary hover:underline transition-all text-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );
}