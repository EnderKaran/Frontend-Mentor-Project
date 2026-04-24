import { useState } from "react";
import { useCart } from "@/context/CartContext";

import menuImage from "./images/icon-menu.svg"
import logoImage from "./images/logo.svg"
import iconCardImage from "./images/icon-cart.svg"
import userAvatarImage from "./images/image-avatar.png"
import closeIconImage from "./images/icon-close.svg"


interface NavbarProps {
  onCartClick: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const navLinks = ["Collections", "Men", "Women", "About", "Contact"];

  return (
    <nav className="relative flex items-center justify-between px-6 py-5 md:py-10 max-w-7xl mx-auto border-b border-gray-100 mb-0 md:mb-20">
      <div className="flex items-center gap-4 md:gap-14">
        {/* Mobil Menü Butonu */}
        <button onClick={() => setIsMenuOpen(true)} className="md:hidden pt-1">
          <img src={menuImage} alt="Menu" />
        </button>

        <a href="/" className="pb-1">
          <img src={logoImage} alt="sneakers" className="h-5 md:h-6" />
        </a>

        <ul className="hidden md:flex gap-8 text-gray-500 font-medium">
          {navLinks.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="hover:text-black relative py-11 border-b-4 border-transparent hover:border-orange-500 transition-all">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-5 md:gap-11">
        {/* 3. onCartClick fonksiyonunu buradaki butona bağlıyoruz */}
        <button onClick={onCartClick} className="relative group">
          <img src={iconCardImage} alt="Cart" className="h-5 md:h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </button>

        <button className="rounded-full border-2 border-transparent hover:border-orange-500 transition-all">
          <img src={userAvatarImage} alt="User Profile" className="h-6 md:h-12" />
        </button>
      </div>

      {/* Mobil Sidebar (Aynı kalıyor) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/75" onClick={() => setIsMenuOpen(false)} />
          <div className="relative bg-white w-[250px] h-full p-6 flex flex-col gap-10">
            <button onClick={() => setIsMenuOpen(false)}>
              <img src={closeIconImage} alt="Close" />
            </button>
            <ul className="flex flex-col gap-6 font-bold text-lg text-black">
              {navLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}