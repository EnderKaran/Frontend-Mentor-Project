import { useState } from "react";
import arrowIcon from "./images/icon-arrow.svg";

interface HeaderProps {
  onSearch: (value: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <header className="relative h-[300px] md:h-[280px] bg-[url('./images/pattern-bg-mobile.png')] md:bg-[url('./images/pattern-bg-desktop.png')] bg-cover bg-center p-6 flex flex-col items-center z-20">
      <h1 className="text-white text-2xl md:text-3xl font-medium mb-7">
        IP Address Tracker
      </h1>
      
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-[555px] flex shadow-lg group"
      >
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for any IP address or domain"
          className="w-full p-4 rounded-l-xl text-lg outline-none text-neutral-900 cursor-pointer placeholder:text-neutral-400"
        />
        <button 
          type="submit"
          aria-label="Search IP"
          className="bg-black hover:bg-neutral-800 transition-all duration-200 px-6 rounded-r-xl flex items-center justify-center"
        >
          <img src={arrowIcon} alt="" className="w-3 h-3" />
        </button>
      </form>
    </header>
  );
}