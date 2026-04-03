interface ResultsProps {
  ip: string;
  location: string;
  timezone: string;
  isp: string;
}

export default function ResultsCard({ ip, location, timezone, isp }: ResultsProps) {
  const renderItem = (label: string, value: string) => (
    <div className="flex flex-col items-center md:items-start space-y-1 md:space-y-2 md:px-8 first:pl-0 last:border-none md:border-l border-neutral-200">
      <span className="text-[10px] md:text-xs font-bold text-neutral-400 uppercase tracking-[0.15em]">
        {label}
      </span>
      <span className="text-lg md:text-2xl font-medium text-neutral-900 leading-tight">
        {value || "-"}
      </span>
    </div>
  );

  return (
    <section className="bg-white rounded-2xl shadow-xl p-6 md:p-10 w-full max-w-[1110px] grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0 relative z-30">
      {renderItem("IP Address", ip)}
      {renderItem("Location", location)}
      {renderItem("Timezone", `UTC ${timezone}`)}
      {renderItem("ISP", isp)}
    </section>
  );
}