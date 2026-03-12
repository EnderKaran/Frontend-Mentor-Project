export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-10 md:py-0 animate-fadeIn">
      {/* Onay İkonu */}
      <img 
        src="/assets/images/icon-thank-you.svg" 
        alt="Thank You" 
        className="w-14 h-14 md:w-20 md:h-20 mb-8"
      />

      {/* Başlık */}
      <h2 className="text-2xl md:text-3xl font-bold text-[hsl(213,96%,18%)] mb-4">
        Thank you!
      </h2>

      {/* Teşekkür Metni */}
      <p className="text-[hsl(231,11%,63%)] leading-relaxed max-w-[450px]">
        Thanks for confirming your subscription! We hope you have fun 
        using our platform. If you ever need support, please feel free 
        to email us at support@loremgaming.com.
      </p>
    </div>
  );
}