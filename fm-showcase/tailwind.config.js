/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sora: ['Sora', 'sans-serif'],
          epilogue: ['Epilogue', 'sans-serif'],
          dmsans: ['DM Sans', 'sans-serif'], 
          bricolage: ['Bricolage Grotesque', 'sans-serif'],
        },
        colors: {
          
          'ty-black': '#0E0E0E',       // Arka plan
          'ty-gray-dark': '#1C1C1C',   // Kart arka planı
          'ty-gray': '#757575',        // Pasif metinler
          'ty-gray-light': '#A3A3A3',  // Okunabilir metinler
          'ty-primary': '#FACC15',     // SARI (Vurgu rengi)

          'weather-bg': 'hsl(243, 96%, 9%)',        // Ana Arka Plan (Neutral 900)
          'weather-card': 'hsl(243, 27%, 20%)',     // Kartlar (Neutral 800)
          'weather-input': 'hsl(243, 23%, 24%)',    // Input & Hover (Neutral 700)
          'weather-secondary': 'hsl(243, 23%, 30%)', // Detaylar (Neutral 600)
          'weather-text-gray': 'hsl(240, 6%, 70%)', // Gri Yazılar (Neutral 300)
          'weather-button': 'hsl(233, 67%, 56%)',   // Mavi Buton (Blue 500)
          'weather-accent': 'hsl(28, 100%, 52%)',   // Turuncu Aksan (Orange 500)

          // --- SHADCN RENKLERİ ---
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
        }
      },
    },
    plugins: [require("tailwindcss-animate")],
}