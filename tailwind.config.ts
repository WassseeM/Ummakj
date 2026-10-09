import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0B0B0B",
          soft: "#141414",
          lift: "#1B1B1B"
        },
        accent: {
          DEFAULT: "#C7A27C",
          light: "#E9CCA5",
          deep: "#8F6B45"
        },
        ink: {
          DEFAULT: "#F4F1EC",
          muted: "#8C8881"
        },
        hairline: "rgba(255,255,255,0.08)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      letterSpacing: {
        lux: "0.42em",
        wide2: "0.22em",
        wide3: "0.14em"
      },
      maxWidth: {
        site: "88rem"
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "marquee-rev": "marquee-rev 46s linear infinite",
        "float-y": "floatY 7s ease-in-out infinite",
        "spin-slow": "spin 26s linear infinite"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "marquee-rev": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" }
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        }
      },
      backgroundImage: {
        "rose-metal": "linear-gradient(115deg, #EBD0AC 0%, #C7A27C 32%, #6F4E2E 55%, #E4C296 88%)",
        "rose-glow":
          "radial-gradient(ellipse at center, rgba(199,162,124,0.16) 0%, rgba(199,162,124,0) 70%)"
      }
    }
  },
  plugins: []
};

export default config;
