import { useState } from "react";
import { useCart } from "@/context/CartContext";

import thumbnailImage1 from "./images/image-product-1-thumbnail.jpg";
import iconMinusImage from "./images/icon-minus.svg";
import iconPlusImage from "./images/icon-plus.svg";
import iconCartImage from "./images/icon-cart.svg";


export default function ProductInfo() {
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(0);

  // Ürün verileri
  const product = {
    id: 1,
    company: "Sneaker Company",
    name: "Fall Limited Edition Sneakers",
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
    price: 125.00,
    originalPrice: 250.00,
    discount: 50,
    image: thumbnailImage1
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      });
      setQuantity(0);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 px-6 md:px-0 py-6 md:py-12 max-w-[445px]">
      {/* Şirket Adı */}
      <h3 className="text-orange-500 uppercase tracking-widest font-bold text-xs md:text-sm">
        {product.company}
      </h3>

      {/* Ürün Başlığı */}
      <h1 className="text-very-dark-blue text-3xl md:text-5xl font-bold leading-tight">
        {product.name}
      </h1>

      {/* Açıklama */}
      <p className="text-dark-grayish-blue text-[15px] md:text-base leading-relaxed">
        {product.description}
      </p>

      {/* Fiyat Bölümü */}
      <div className="flex md:flex-col justify-between items-center md:items-start gap-2">
        <div className="flex items-center gap-4">
          <span className="text-very-dark-blue text-3xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          <span className="bg-pale-orange text-orange-500 font-bold px-2 py-0.5 rounded-md">
            {product.discount}%
          </span>
        </div>
        <span className="text-grayish-blue font-bold line-through">
          ${product.originalPrice.toFixed(2)}
        </span>
      </div>

      {/* Alt Etkileşim Grubu */}
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {/* Adet Seçici */}
        <div className="flex items-center justify-between bg-light-grayish-blue rounded-lg px-4 py-4 md:w-1/3">
          <button onClick={handleDecrement} className="hover:opacity-60 transition-opacity">
            <img src={iconMinusImage} alt="Decrease" />
          </button>
          <span className="font-bold text-very-dark-blue">{quantity}</span>
          <button onClick={handleIncrement} className="hover:opacity-60 transition-opacity">
            <img src={iconPlusImage} alt="Increase" />
          </button>
        </div>

        {/* Sepete Ekle Butonu */}
        <button 
          onClick={handleAddToCart}
          disabled={quantity === 0}
          className="flex-1 bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-4 shadow-lg shadow-orange-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img src={iconCartImage} alt="" className="brightness-0 invert h-4" />
          Add to cart
        </button>
      </div>
    </div>
  );
}