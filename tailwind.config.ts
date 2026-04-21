import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fff4ed",
          100: "#ffe6d4",
          200: "#ffc8a8",
          300: "#ffa271",
          400: "#ff7a3d",
          500: "#ff6b35",
          600: "#ff8500",
          700: "#d15c00",
          800: "#a34600",
          900: "#7a3400",
        },
        ink: {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
          500: "#64748b",
          400: "#94a3b8",
          300: "#cbd5e1",
          200: "#e2e8f0",
          100: "#f1f5f9",
          50:  "#f8fafc",
        },
        paper: "#ffffff",
        night: "#0f172a",
      },
      fontFamily: {
        sans: ["Inter", "Pretendard", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Noto Serif KR'", "ui-serif", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-lg": ["3rem",    { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.18", letterSpacing: "-0.015em" }],
      },
      boxShadow: {
        card:   "0 1px 2px 0 rgba(15,23,42,0.04), 0 1px 3px 0 rgba(15,23,42,0.04)",
        hover:  "0 10px 25px -6px rgba(15,23,42,0.12), 0 4px 10px -4px rgba(15,23,42,0.06)",
        brand:  "0 4px 12px rgba(255,107,53,0.24)",
        brandLg:"0 10px 28px rgba(255,107,53,0.28)",
      },
      borderRadius: {
        sm: "6px", md: "8px", lg: "12px", xl: "16px", "2xl": "20px",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
