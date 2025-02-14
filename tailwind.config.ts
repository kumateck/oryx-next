import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // extend: {
    //   colors: {
    //     background: "var(--background)",
    //     foreground: "var(--foreground)",
    //   },
    //   borderRadius: {
    //     lg: "var(--radius)",
    //     md: "calc(var(--radius) - 2px)",
    //     sm: "calc(var(--radius) - 4px)",
    //   },
    // },
    extend: {
      fontSize: {
        xs: "0.75rem",
      },
      backgroundImage: {
        banner: "url('/assets/banner.png')",
      },
      height: {
        "scroll-height": "calc(100vh - 50px)",
        "container-scroll": "calc(100vh - 202px)",
      },
      maxHeight: {
        scroll: "calc(100vh - 50px)",
        "container-scroll": "calc(100vh - 80px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          default: "#0078D4",
          pressed: "#095A97",
          hover: "#106EBE",
          disabled: "#F3F2F1",
          selected: "#88C8FF",
          inverted: "#006680",
        },
        white: "#FFFFFF",
        neutral: {
          hover: "#F5F5F5",
          light: "#EDEBE9",
          lighter: "#F3F2F1",
          bg: "#FAFAFA",
          lighterAlt: "#FAF9F8",
          lightAlt: "#EBEBEB",
          input: "#E0E0E0",
          quaternaryAlt: "#E1DFDD",
          quaternary: "#D2D0CE",
          tertiaryAlt: "#C8C6C4",
          tertiary: "#A19F9D",
          secondaryAlt: "#8A8886",
          text: "#747474",
          secondary: "#605E5C",
          primaryAlt: "#3B3A39",
          default: "#323130",
          dark: "#201F1E",
          inverted: "#292929",
        },
        black: "#000000",
        danger: {
          default: "#C50F1F",
          bg: "#FDF3F4",
          hover: "#B10E1C",
          disabled: "#FDF3F4",
          selected: "#EEACB2",
        },
        sidebar: {
          DEFAULT: "#F0F0F0",
          foreground: "#000000",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "#FFFFFF",
          "accent-foreground": "#201F1E",
          border: "#F5F5F5",
          ring: "#F5F5F5",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
      },
      borderWidth: {
        DEFAULT: "1px",
        "0": "0",
        "2": "2px",
        "3": "3px",
        "4": "4px",
        "6": "6px",
        "8": "8px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        //   lg: "var(--radius)",
        //   md: "calc(var(--radius) - 2px)",
        //   sm: "calc(var(--radius) - 4px)",
        //   xs: "calc(var(--radius) - 6px)",
      },

      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-animate"),
  ],
} satisfies Config;
