import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#feb300",
        "on-primary": "#1a1c1e",
        "background": "#f8f9fa",
        "on-background": "#1a1c1e",
        "surface": "#ffffff",
        "on-surface": "#1a1c1e",
        "surface-variant": "#e1e2e5",
        "on-surface-variant": "#44474e",
        "outline": "#74777f",
        "outline-variant": "#c4c6cf",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "success": "#2e7d32",
        "secondary": "#5d5e62"
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.5rem",
        "xl": "1rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["Rubik"],
        "body": ["Rubik"],
        "label": ["Rubik"]
      }
    },
  },
  plugins: [],
} satisfies Config;
