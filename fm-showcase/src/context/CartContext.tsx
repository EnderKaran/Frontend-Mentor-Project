import { createContext, useContext, useState, type ReactNode } from "react";

// Sepetteki her bir ürünün tipi
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string; 
}

// Context'in dışarıya sunduğu değerlerin tipi
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Sepete ürün ekleme veya miktar güncelleme mantığı
  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find((item) => item.id === newItem.id);

      if (isItemInCart) {
        // Eğer ürün zaten varsa, miktarını topla
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      // Ürün yoksa yeni olarak ekle
      return [...prevItems, newItem];
    });
  };

  // Sepetten ürün silme
  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  // Sepet ikonundaki "Badge" için toplam ürün sayısı
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Kolay kullanım için custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};