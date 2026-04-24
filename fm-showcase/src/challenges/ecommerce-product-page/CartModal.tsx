import { useCart } from "@/context/CartContext";

export default function CartModal() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="absolute top-20 right-2 md:right-0 z-50 w-[95%] md:w-[360px] bg-white rounded-lg shadow-2xl min-h-[256px] flex flex-col mx-auto left-2 md:left-auto">
      {/* Modal Başlığı */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-bold text-black">Cart</h3>
      </div>

      {/* Modal İçeriği */}
      <div className="flex-1 flex flex-col p-6">
        {cartItems.length > 0 ? (
          <>
            <div className="flex flex-col gap-6 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  {/* Ürün Görseli */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-md" 
                  />
                  
                  {/* Ürün Bilgileri */}
                  <div className="flex-1 text-gray-500 text-[15px]">
                    <p className="truncate w-40 md:w-full">{item.name}</p>
                    <p>
                      ${item.price.toFixed(2)} x {item.quantity}{" "}
                      <span className="font-bold text-black ml-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>

                  {/* Silme Butonu */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <img src="/images/icon-delete.svg" alt="Delete item" />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Checkout Butonu */}
            <button className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 rounded-lg transition-colors shadow-md">
              Checkout
            </button>
          </>
        ) : (
          /* Boş Sepet Durumu */
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 font-bold">Your cart is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}