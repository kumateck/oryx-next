import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Common class
    "border",
    // Red
    "border-red-300",
    "bg-red-100",
    "text-red-800",
    // Blue
    "border-blue-300",
    "bg-blue-100",
    "text-blue-800",
    // Green
    "border-green-300",
    "bg-green-100",
    "text-green-800",
    // Yellow
    "border-yellow-300",
    "bg-yellow-100",
    "text-yellow-800",
    // Indigo
    "border-indigo-300",
    "bg-indigo-100",
    "text-indigo-800",
    // Purple
    "border-purple-300",
    "bg-purple-100",
    "text-purple-800",
    // Pink
    "border-pink-300",
    "bg-pink-100",
    "text-pink-800",
    // Amber
    "border-amber-300",
    "bg-amber-100",
    "text-amber-800",
    // Orange
    "border-orange-300",
    "bg-orange-100",
    "text-orange-800",
    // Lime
    "border-lime-300",
    "bg-lime-100",
    "text-lime-800",
    // Emerald
    "border-emerald-300",
    "bg-emerald-100",
    "text-emerald-800",
    // Teal
    "border-teal-300",
    "bg-teal-100",
    "text-teal-800",
    // Cyan
    "border-cyan-300",
    "bg-cyan-100",
    "text-cyan-800",
    // Sky
    "border-sky-300",
    "bg-sky-100",
    "text-sky-800",
    // Violet
    "border-violet-300",
    "bg-violet-100",
    "text-violet-800",
    // Fuchsia
    "border-fuchsia-300",
    "bg-fuchsia-100",
    "text-fuchsia-800",
    // Rose
    "border-rose-300",
    "bg-rose-100",
    "text-rose-800",
    // Gray
    "border-gray-300",
    "bg-gray-100",
    "text-gray-800",
    // Stone
    "border-stone-300",
    "bg-stone-100",
    "text-stone-800",
    // Zinc
    "border-zinc-300",
    "bg-zinc-100",
    "text-zinc-800",
    "bg-platinum-default",
    "text-platinum-disabled",
    "bg-warning-default",
    "text-warning-disabled",
    "bg-teal-default",
    "text-teal-disabled",
    "bg-severe-default",
    "text-severe-disabled",
    "bg-danger-default",
    "text-danger-disabled",
    "bg-gold-default",
    "text-gold-disabled",
  ],
  theme: {
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
        "container-scroll-height": "calc(100vh - 132px)",
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
          disabled: "#FDF3F4",
          bg: "#FDF3F4",
          selected: "#EEACB2",
          default: "#C50F1F",
          hover: "#B10E1C",
        },
        success: {
          disabled: "#F1FAF1",
          bg: "#F1FAF1",
          selected: "#9FD89F",
          inverted: "#359B35",
          default: "#107C10",
          hover: "#0E700E",
        },
        severe: {
          disabled: "#FDF6F3",
          bg: "#FDF6F3",
          selected: "#F4BFAB",
          default: "#DA3B01",
          hover: "#C43501",
        },
        warning: {
          disabled: "#FFF9F5",
          bg: "#FFF9F5",
          selected: "#FDCFB4",
          inverted: "#F7630C",
          default: "#BC4B09",
          hover: "#8A3707",
        },
        platinum: {
          disabled: "#CDD6D8",
          bg: "#CDD6D8",
          selected: "#69797E",
          default: "#3B4447",
          hover: "#202427",
        },
        teal: {
          disabled: "#A6E9ED",
          bg: "#9BD9DB",
          selected: "#00B7C3",
          inverted: "#038387",
          default: "#00666D",
          hover: "#02494C",
        },
        gold: {
          disabled: "#FFDDB3",
          bg: "#ECDFA5",
          selected: "#F9E2AE",
          inverted: "#F2C661",
          default: "#C19C00",
          hover: "#EAA300",
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
