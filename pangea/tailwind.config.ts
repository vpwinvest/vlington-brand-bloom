import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#15130F",
          50: "#F5F3EF",
          100: "#E9E5DD",
          200: "#D2CBBC",
          300: "#AFA48D",
          400: "#847761",
          500: "#5E5443",
          600: "#443C30",
          700: "#332C23",
          800: "#221D17",
          900: "#15130F",
        },
        paper: {
          DEFAULT: "#FAF7F2",
          50: "#FFFFFF",
          100: "#FDFBF8",
          200: "#FAF7F2",
          300: "#F2ECE2",
        },
        horizon: {
          50: "#FFF3EA",
          100: "#FFE3CC",
          200: "#FFC495",
          300: "#FFA35D",
          400: "#F5893D",
          500: "#E8722A",
          600: "#C85A1B",
          700: "#A24616",
          800: "#7A3512",
          900: "#4F220B",
        },
        earth: {
          50: "#E9F2EE",
          100: "#C9E0D6",
          200: "#96C3AF",
          300: "#5FA285",
          400: "#357F63",
          500: "#1F5F49",
          600: "#194C3B",
          700: "#153F31",
          800: "#0F2C22",
          900: "#0A1E17",
        },
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 16px -4px rgba(21,19,15,0.08)",
        card: "0 1px 2px rgba(21,19,15,0.06), 0 8px 24px -8px rgba(21,19,15,0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config;
