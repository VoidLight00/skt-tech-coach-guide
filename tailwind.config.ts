import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          bg: "#07080b",
          surface: "#0e1017",
          elev: "#14171f",
          line: "#1f2330",
          muted: "#7b8193",
          text: "#e6e9f2",
          ink: "#f4f6fb",
        },
        neon: {
          cyan: "#5cf1ff",
          magenta: "#ff4fd8",
          gold: "#ffd166",
          lime: "#b6f36a",
        },
        skt: {
          red: "#ea0029",
          orange: "#ff7a00",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Noto Serif KR'", "ui-serif", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(92,241,255,0.25), 0 0 28px -8px rgba(92,241,255,0.6)",
        magenta: "0 0 0 1px rgba(255,79,216,0.25), 0 0 28px -8px rgba(255,79,216,0.6)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(1200px 600px at 10% -10%, rgba(92,241,255,0.08), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(255,79,216,0.06), transparent 60%)",
        "scanline":
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 3px)",
      },
      keyframes: {
        "pulse-ring": {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(92,241,255,0.35)" },
          "50%": { boxShadow: "0 0 0 14px rgba(92,241,255,0)" },
        },
        "shine": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2.2s ease-in-out infinite",
        shine: "shine 2.5s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
