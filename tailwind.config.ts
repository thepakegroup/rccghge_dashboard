import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "side-bar-bg": "linear-gradient(180deg, #084386 0%, #072E5A 100%)",
        'bg-mobile': "url('/images/bg-mobile.svg')",
        'bg-desktop':"url('/images/bg-desktop.svg')",
      },
      colors: {
        secondary: '#052A53',
        "secondary-01": "#EA7C7C",
        'secondary-02': '#1064C6',
        "fade-ash": "#717171",
        'ash-100': '#9E9E9E',
        'ash-200': "#464646",
        'ash-300':'#686868',
        'blue-100': '#1064C6',
        'warning-400': "#FEF6E7",
        'error-400':'#D42620'
      },
      boxShadow: {
        modalShadow:'0px 4px 25px 0px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [
     function ({ addUtilities }:{addUtilities:any}) {
      addUtilities({
        '.calc-width-50': {
          width: 'calc(100% - 271px)',
        },
      }, ['responsive']);
    },
  ],
}
export default config
