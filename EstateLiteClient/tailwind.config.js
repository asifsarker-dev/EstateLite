import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#4A8CE8',
          dark: '#1E293B',
          muted: '#64748B',
          light: '#F8FAFC',
        }
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        estatelite: {
          "primary": "#4A8CE8",
          "secondary": "#1E293B",
          "accent": "#0284C7",
          "neutral": "#334155",
          "base-100": "#FFFFFF",
          "base-200": "#F8FAFC",
          "base-300": "#E2E8F0",
          "info": "#38BDF8",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
      "light",
    ],
    defaultTheme: "estatelite",
  },
}

