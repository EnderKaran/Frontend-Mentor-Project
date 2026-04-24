import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const navLinks = ["Collections", "Men", "Women", "About", "Contact"];

  return (
    <nav className="relative flex items-center justify-between px-6 py-5 md:py-10 max-w-7xl mx-auto border-b border-gray-100 mb-0 md:mb-20">
      <div className="flex items-center gap-4 md:gap-14">
        {/* Mobil Menü Butonu */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden pt-1"
        >
          <img src="/images/icon-menu.svg" alt="Menu" />
        </button>

        {/* Logo */}
        <a href="/" className="pb-1">
          <img src="/images/logo.svg" alt="sneakers" className="h-5 md:h-6" />
        </a>

        {/* Masaüstü Linkler */}
        <ul className="hidden md:flex gap-8 text-gray-500 font-medium">
          {navLinks.map((link) => (
            <li key={link}>
              <a 
                href={`#${link.toLowerCase()}`} 
                className="hover:text-black relative py-11 border-b-4 border-transparent hover:border-orange-500 transition-all"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Sağ Kısım: Sepet ve Profil */}
      <div className="flex items-center gap-5 md:gap-11">
        <button className="relative group">
          <img src="/images/icon-cart.svg" alt="Cart" className="h-5 md:h-6" />
          {/* Sepet Badge: Sadece ürün varsa göster */}
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </button>

        {/* Profil Resmi */}
        <button className="rounded-full border-2 border-transparent hover:border-orange-500 transition-all">
          <img src="/images/image-avatar.png" alt="User Profile" className="h-6 md:h-12" />
        </button>
      </div>

      {/* Mobil Sidebar Menü */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay (Koyu arka plan) */}
          <div 
            className="fixed inset-0 bg-black/75" 
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menü İçeriği */}
          <div className="relative bg-white w-[250px] h-full p-6 flex flex-col gap-10">
            <button onClick={() => setIsMenuOpen(false)}>
              <img src="/images/icon-close.svg" alt="Close" />
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