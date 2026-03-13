import { useState } from "react";

// Görsel ve İkon Importları
import logo from "../images/logo.svg";
import iconHamburger from "../images/icon-hamburger.svg";
import iconClose from "../images/icon-close.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 

  const navLinks = ["home", "shop", "about", "contact"]; //

  return (
    <nav className="absolute top-0 left-0 w-full z-50 p-8 lg:p-16 flex items-center justify-between lg:justify-start lg:gap-16">
      {/* MOBİL: Hamburger Butonu */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 -ml-2"
        aria-label="Open menu"
      >
        <img src={iconHamburger} alt="" />
      </button>

      {/* LOGO: Mobilde ortada, Masaüstünde solda */}
      <div className="flex-1 lg:flex-none flex justify-center lg:block">
        <a href="/">
          <img src={logo} alt="room" className="h-4 lg:h-auto" />
        </a>
      </div>

      {/* MASAÜSTÜ MENÜ: Şeffaf arka plan, beyaz yazılar */}
      <ul className="hidden lg:flex gap-8">
        {navLinks.map((link) => (
          <li key={link}>
            <a 
              href={`#${link}`} 
              className="text-white font-bold lowercase text-sm relative group"
            >
              {link}
              {/* Hover Alt Çizgi Efekti */}
              <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </a>
          </li>
        ))}
      </ul>

      {/* MOBİL MENÜ (OVERLAY): Açıldığında beyaz arka plan */}
      <div className={`
        fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 lg:hidden
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
      `}>
        <div className={`
          absolute top-0 left-0 w-full bg-white p-8 flex items-center justify-between transition-transform duration-300
          ${isOpen ? "translate-y-0" : "-translate-y-full"}
        `}>
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <img src={iconClose} alt="" />
          </button>
          
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link}>
                <a href={`#${link}`} className="text-room-black font-bold lowercase text-sm">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}