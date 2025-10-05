/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 🎨 Базовые цвета темы
        primary: {
          DEFAULT: "#FF7A00", // яркий оранжевый
          light: "#FFA733",
          dark: "#CC6200",
        },
        secondary: {
          DEFAULT: "#1E293B", // тёмно-серый для текста
          light: "#334155",
        },
        background: {
          DEFAULT: "#FFFFFF", // основной фон
          muted: "#F8FAFC", // светлый фон для карточек/секций
        },
        border: "#E2E8F0", // тонкие границы
        success: "#22C55E",
        warning: "#FACC15",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "System-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 4px 6px rgba(0,0,0,0.05)",
        button: "0 2px 4px rgba(255,122,0,0.3)",
      },
    },
  },
  plugins: [],
};
