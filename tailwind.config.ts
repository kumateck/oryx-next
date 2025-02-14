// import type { Config } from "tailwindcss";
// const config: Config = {
//     darkMode: ["class"],
//     content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//   	extend: {
//   		colors: {
//   			background: 'var(--background)',
//   			foreground: 'var(--foreground)',
//   			sidebar: {
//   				DEFAULT: 'hsl(var(--sidebar-background))',
//   				foreground: 'hsl(var(--sidebar-foreground))',
//   				primary: 'hsl(var(--sidebar-primary))',
//   				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
//   				accent: 'hsl(var(--sidebar-accent))',
//   				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
//   				border: 'hsl(var(--sidebar-border))',
//   				ring: 'hsl(var(--sidebar-ring))'
//   			},
// 			main:{
// DEFAULT:"#FAF9F8"
// 			},
// 			  primary: {
// 				900: "#16273D",
// 				800: "#07426F",
// 				700: "#095A97",
// 				600: "#106EBE",
// 				500: "#0078D4",
// 				400: "#2484CE",
// 				300: "#61A7DD",
// 				200: "#ABD1EE",
// 				100: "#D1E6F6",
// 				50: "#F3F9FD",
// 			  },
// 			  secondary: {
// 				900: "#000000",
// 				800: "#030303",
// 				700: "#181717",
// 				600: "#201F1E",
// 				500: "#323130",
// 				400: "#3B3A39",
// 				300: "#D2D0CE",
// 				200: "#EDEBE9",
// 				100: "#F3F2F1",
// 				50: "#FAF9F8",
// 			  },
// 			  accent: {
// 				900: "#00534C",
// 				500: "#2CD5C7",
// 				300: "#37FAEA",
// 				200: "#8AFFF5",
// 				100: "#C8FFFB",
// 			  },
// 			  popover: {
// 				DEFAULT: "hsl(var(--popover))",
// 				foreground: "hsl(var(--popover-foreground))",
// 			  },
// 			  card: {
// 				DEFAULT: "hsl(var(--card))",
// 				foreground: "hsl(var(--card-foreground))",
// 			  },
// 			  danger: {
// 				900: "#7F1D1D",
// 				800: "#7F1D1D",
// 				700: "#B91C1C",
// 				600: "#DC2626",
// 				500: "#EF4444",
// 				400: "#F87171",
// 				300: "#FCA5A5",
// 				200: "#FECACA",
// 				100: "#FEE2E2",
// 				50: "#FEF2F2",
// 			  },
// 			  info: {
// 				900: "#055565",
// 				500: "#0CB8DA",
// 				300: "#5DDBF5",
// 				200: "#90E7F8",
// 				100: "#B4EFFA",
// 			  },
// 			  warning: {
// 				900: "#78350F",
// 				800: "#92400E",
// 				700: "#B45309",
// 				600: "#D97706",
// 				500: "#F59E0B",
// 				400: "#FBBF24",
// 				300: "#FCD34D",
// 				200: "#FDE68A",
// 				100: "##FEF3C7",
// 				50: "#FFFBEB",
// 			  },
// 			  success: {
// 				900: "#14532D",
// 				800: "#166534",
// 				700: "#15803D",
// 				600: "#16A34A",
// 				500: "#22C55E",
// 				400: "#4ADE80",
// 				300: "#86EFAC",
// 				200: "#BBF7D0",
// 				100: "#DCFCE7",
// 				50: "#F0FDF4",
// 			  },
// 			  neutral: {
// 				900: "#0F172A",
// 				800: "#1F2937",
// 				700: "#374151",
// 				600: "#4B5563",
// 				500: "#647488",
// 				400: "#9CA3AF",
// 				300: "#CBD5E1",
// 				200: "#E7ECF2",
// 				100: "#F9FAFB",
// 				50: "#FDFDFD",
// 			  },
// 			  black: "#000000",
// 			  white: "#FFFFFF",
//   		},
// 		  fontFamily: {
// 			krub: ["Krub", "sans-serif"],
// 		  },
//   		borderRadius: {
//   			lg: 'var(--radius)',
//   			md: 'calc(var(--radius) - 2px)',
//   			sm: 'calc(var(--radius) - 4px)'
//   		}
//   	}
//   },
//   plugins: [require("tailwindcss-animate")],
// };
// export default config;
// import type { Config } from "tailwindcss";
// import tailwindcssAnimate from "tailwindcss-animate";
// const config: Config = {
//   darkMode: ["class"],
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//         sidebar: {
//           DEFAULT: "hsl(var(--sidebar-background))",
//           foreground: "hsl(var(--sidebar-foreground))",
//           primary: "hsl(var(--sidebar-primary))",
//           "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
//           accent: "hsl(var(--sidebar-accent))",
//           "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
//           border: "hsl(var(--sidebar-border))",
//           ring: "hsl(var(--sidebar-ring))",
//         },
//         main: {
//           DEFAULT: "#FAF9F8",
//         },
//         primary: {
//           "50": "#F3F9FD",
//           "100": "#D1E6F6",
//           "200": "#ABD1EE",
//           "300": "#61A7DD",
//           "400": "#2484CE",
//           "500": "#0078D4",
//           "600": "#106EBE",
//           "700": "#095A97",
//           "800": "#07426F",
//           "900": "#16273D",
//         },
//         secondary: {
//           "50": "#FAF9F8",
//           "100": "#F3F2F1",
//           "200": "#EDEBE9",
//           "300": "#D2D0CE",
//           "400": "#3B3A39",
//           "500": "#323130",
//           "600": "#201F1E",
//           "700": "#181717",
//           "800": "#030303",
//           "900": "#000000",
//         },
//         accent: {
//           "100": "#C8FFFB",
//           "200": "#8AFFF5",
//           "300": "#37FAEA",
//           "500": "#2CD5C7",
//           "900": "#00534C",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//         danger: {
//           "50": "#FEF2F2",
//           "100": "#FEE2E2",
//           "200": "#FECACA",
//           "300": "#FCA5A5",
//           "400": "#F87171",
//           "500": "#EF4444",
//           "600": "#DC2626",
//           "700": "#B91C1C",
//           "800": "#7F1D1D",
//           "900": "#7F1D1D",
//         },
//         info: {
//           "100": "#B4EFFA",
//           "200": "#90E7F8",
//           "300": "#5DDBF5",
//           "500": "#0CB8DA",
//           "900": "#055565",
//         },
//         warning: {
//           "50": "#FFFBEB",
//           "100": "##FEF3C7",
//           "200": "#FDE68A",
//           "300": "#FCD34D",
//           "400": "#FBBF24",
//           "500": "#F59E0B",
//           "600": "#D97706",
//           "700": "#B45309",
//           "800": "#92400E",
//           "900": "#78350F",
//         },
//         success: {
//           "50": "#F0FDF4",
//           "100": "#DCFCE7",
//           "200": "#BBF7D0",
//           "300": "#86EFAC",
//           "400": "#4ADE80",
//           "500": "#22C55E",
//           "600": "#16A34A",
//           "700": "#15803D",
//           "800": "#166534",
//           "900": "#14532D",
//         },
//         neutral: {
//           "50": "#FDFDFD",
//           "100": "#F9FAFB",
//           "200": "#E7ECF2",
//           "300": "#CBD5E1",
//           "400": "#9CA3AF",
//           "500": "#647488",
//           "600": "#4B5563",
//           "700": "#374151",
//           "800": "#1F2937",
//           "900": "#0F172A",
//         },
//         black: "#000000",
//         white: "#FFFFFF",
//       },
//       fontFamily: {
//         krub: ["Krub", "sans-serif"],
//       },
//       fontSize: {
//         xxs: "0.625rem",
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       keyframes: {
//         "accordion-down": {
//           from: {
//             height: "0",
//           },
//           to: {
//             height: "var(--radix-accordion-content-height)",
//           },
//         },
//         "accordion-up": {
//           from: {
//             height: "var(--radix-accordion-content-height)",
//           },
//           to: {
//             height: "0",
//           },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//       },
//     },
//   },
//   plugins: [tailwindcssAnimate],
// };
// export default config;
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },

      borderWidth: {},
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

    // require("tailwindcss-themer")({
    //   defaultTheme: {
    //     extend: {
    //       colors: {
    //         neutral: {
    //           default: {
    //             50: "#FFFFFF",
    //             100: "#FAFAFA",
    //             200: "#F5F5F5",
    //             300: "#F0F0F0",
    //             400: "#EBEBEB",
    //             500: "#E6E6E6",
    //             inverted: "#292929",
    //             disabled: "#F0F0F0",
    //           },
    //           hover: {
    //             100: "#F5F5F5",
    //             200: "#F0F0F0",
    //             300: "#EBEBEB",
    //             400: "#FAFAFA",
    //             500: "#F5F5F5",
    //           },
    //           pressed: {
    //             100: "#E0E0E0",
    //             200: "#DBDBDB",
    //             300: "#D6D6D6",
    //             400: "#F5F5F5",
    //             500: "#F0F0F0",
    //           },
    //           selected: {
    //             100: "#EBEBEB",
    //             200: "#E6E6E6",
    //             300: "#E0E0E0",
    //             400: "#FFFFFF",
    //             500: "#FAFAFA",
    //           },
    //         },
    //         primary: {
    //           default: {
    //             50: "#E9F3FD",
    //             100: "#006EC3",
    //             200: "#006EC3",
    //             300: "#F0F0F0",
    //             400: "#EBEBEB",
    //             500: "#0078D4",
    //             inverted: "#292929",
    //             disabled: "#F0F0F0",
    //           },
    //           hover: {
    //             100: "#CAE5FC",
    //             200: "#F0F0F0",
    //             300: "#EBEBEB",
    //             400: "#FAFAFA",
    //             500: "#F5F5F5",
    //           },
    //           pressed: {
    //             100: "#88C8FF",
    //             200: "#DBDBDB",
    //             300: "#D6D6D6",
    //           },
    //           selected: {
    //             100: "#005590",
    //           },
    //         },
    //       },
    //     },
    //   },
    //   themes: [
    //     {
    //       name: "dark",
    //       extend: {
    //         colors: {
    //           neutral: {
    //             default: {
    //               50: "#292929",
    //               100: "#1F1F1F",
    //               200: "#141414",
    //               300: "#0A0A0A",
    //               400: "#000000",
    //               500: "#333333",
    //               inverted: "#FFFFFF",
    //               disabled: "#FFFFFF",
    //             },
    //             hover: {
    //               100: "#3D3D3D",
    //               200: "#333333",
    //               300: "#292929",
    //               400: "#1F1F1F",
    //               500: "#141414",
    //             },
    //             pressed: {
    //               100: "#1F1F1F",
    //               200: "#141414",
    //               300: "#0A0A0A",
    //               400: "#000000",
    //               500: "#050505",
    //             },
    //             selected: {
    //               100: "#383838",
    //               200: "#2E2E2E",
    //               300: "#242424",
    //               400: "#1A1A1A",
    //               500: "#0F0F0F",
    //             },
    //           },
    //           primary: {
    //             default: {
    //               100: "#1F1F1F",
    //               200: "#141414",
    //               300: "#0A0A0A",
    //               400: "#000000",
    //               500: "#333333",
    //               inverted: "#FFFFFF",
    //               disabled: "#FFFFFF",
    //             },
    //           },
    //         },
    //       },
    //     },
    //     {
    //       name: "neon",
    //       extend: {
    //         colors: {
    //           secondary: {
    //             // here I'm overwriting a custom default again
    //             500: "#90A040", // as red as it gets
    //           },
    //           // im not overwriting the custom primary color I made ... I wonder what will happen ??? 🤔🤔🤔
    //         },
    //       },
    //     },
    //   ],
    // }),
  ],
} satisfies Config;
