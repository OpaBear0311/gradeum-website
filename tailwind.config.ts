import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        gradeum: {
          navy: "#1B3A5C",
          cyan: "#00ACC1",
          "cyan-deep": "#00838F",
          gold: "#F5A623",
          text: "#333333",
          muted: "#666666",
          border: "#E0E0E0",
          mist: "#F8F9FA"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"]
      },
      boxShadow: {
        panel: "0 24px 80px -40px rgba(27, 58, 92, 0.35)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top left, rgba(0, 172, 193, 0.14), transparent 32%), radial-gradient(circle at bottom right, rgba(245, 166, 35, 0.12), transparent 24%)"
      }
    }
  },
  plugins: []
};

export default config;
