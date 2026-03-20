import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Crimson Pro"', "Georgia", "serif"],
        sans: ['"Source Sans 3"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        accent: {
          DEFAULT: "#4a6fa5",
          dark: "#6b93d6",
        },
        surface: {
          light: "#fafafa",
          dark: "#141414",
        },
        text: {
          light: "#1a1a1a",
          dark: "#e5e5e5",
        },
      },
      maxWidth: {
        prose: "680px",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "680px",
            a: {
              color: "#4a6fa5",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
          },
        },
        invert: {
          css: {
            a: {
              color: "#6b93d6",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
