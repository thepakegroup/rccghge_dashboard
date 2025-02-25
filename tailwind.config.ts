import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    darkMode: false,
    extend: {
      backgroundImage: {
        "side-bar-bg": "linear-gradient(180deg, #084386 0%, #072E5A 100%)",
        "bg-mobile": "url('/images/mobile-img.png')",
        "bg-desktop": "url('/images/desktop-img.png')",
      },
      colors: {
        secondary: "#052A53",
        "secondary-01": "#EA7C7C",
        "secondary-02": "#1064C6",
        "fade-ash": "#717171",
        "ash-100": "#9E9E9E",
        "ash-200": "#464646",
        "ash-300": "#686868",
        "blue-100": "#1064C6",
        "warning-400": "#FEF6E7",
        "error-400": "#D42620",
        // orange: "#EA5017",
        orange: "#E77400",
        "gray-1": "#101928",
        "gray-2": "#D2D9E1",
        light: {
          200: "#F1F1F6",
        },
      },
      boxShadow: {
        modalShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.15)",
      },
      fontFamily: {
        "play-fair-display": "'Playfair Display', serif",
        // quicksand: "'Quicksand', sans-serif",
        quicksand: "var(--quicksand), sans-serif",
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),

    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities(
        {
          ".calc-width-50": {
            width: "calc(100% - 271px)",
          },
        },
        ["responsive"]
      );
    },
  ],
};
export default config;
