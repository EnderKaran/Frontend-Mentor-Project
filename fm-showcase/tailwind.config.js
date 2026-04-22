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
          noto: ['Noto Sans', 'sans-serif'],
          spartan: ['League Spartan', 'sans-serif'], // Job Listings Ana Fontu
        },
        colors: {
          // --- JOB LISTINGS PROJESİ RENKLERİ ---
          'job-primary': 'hsl(180, 29%, 50%)',   // Green 400
          'job-bg': 'hsl(180, 52%, 96%)',        // Green 50 (Background)
          'job-gray': 'hsl(180, 8%, 52%)',      // Gray 400
          'job-dark': 'hsl(180, 14%, 20%)',      // Green 900

          // --- DİĞER PROJELERİNİN RENKLERİ ---
          'room-grey-500': 'hsl(0, 0%, 63%)',
          'room-grey-800': 'hsl(0, 0%, 27%)',
          'room-black': 'hsl(0, 0%, 0%)',

          'price-green': 'var(--price-green-400)',
          'price-bg': 'var(--price-slate-50)',
          'price-text': 'var(--price-slate-800)',
          
          'ty-black': '#0E0E0E',
          'ty-gray-dark': '#1C1C1C',
          'ty-gray': '#757575',
          'ty-gray-light': '#A3A3A3',
          'ty-primary': '#FACC15',

          'weather-bg': 'hsl(243, 96%, 9%)',
          'weather-card': 'hsl(243, 27%, 20%)',
          'weather-input': 'hsl(243, 23%, 24%)',
          'weather-secondary': 'hsl(243, 23%, 30%)',
          'weather-text-gray': 'hsl(240, 6%, 70%)',
          'weather-button': 'hsl(233, 67%, 56%)',
          'weather-accent': 'hsl(28, 100%, 52%)',

          'ext-900': 'hsl(227, 75%, 14%)',
          'ext-800': 'hsl(226, 25%, 17%)',
          'ext-700': 'hsl(225, 23%, 24%)',
          'ext-600': 'hsl(226, 11%, 37%)',
          'ext-200': 'hsl(217, 61%, 90%)',
          'ext-0': 'hsl(200, 60%, 99%)',
          'ext-red': 'hsl(3, 71%, 56%)',

          'mod-purple': '#5357b6',
          'mod-red': '#ed6368',
          'mod-light-purple': '#c5c6ef',
          'mod-pale-red': '#ffb8bb',
          'mod-dark-blue': '#334253',
          'mod-grayish-blue': '#67727e',
          'mod-light-gray': '#f5f6fa',
          'mod-very-light-gray': '#f2f4f7',
          'mod-white': '#ffffff',

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
        },
        backgroundImage: {
          'ext-light-grad': 'linear-gradient(180deg, #EBF2FC 0%, #EEF8F9 100%)',
          'ext-dark-grad': 'linear-gradient(180deg, #040918 0%, #091540 100%)',
        },
        fontWeight: {
          medium: 500, // Spartan Medium
          semibold: 600,
          bold: 700,   // Spartan Bold
        }
      },
    },
    plugins: [require("tailwindcss-animate")],
}