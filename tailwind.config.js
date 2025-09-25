/** @type {import('tailwindcss').Config} */

const tailwindConfig = {
  content: [
    "./assets/*.{liquid,js,json}",
    "./config/*.{liquid,js,json}",
    "./layout/*.{liquid,js,json}",
    "./sections/*.{liquid,js,json}",
    "./snippets/*.{liquid,js,json}",
    "./templates/**/*.{liquid,js,json}",
  ],
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      gridTemplateColumns: {
        14: "repeat(14, minmax(0, 1fr))",
        15: "repeat(15, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
        17: "repeat(17, minmax(0, 1fr))",
        18: "repeat(18, minmax(0, 1fr))",
        19: "repeat(19, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
      },
    },
  },
};

if (process.env.NODE_ENV !== "production") {
  // tailwindConfig.safelist.push({
  //   pattern: /./,
  // })
}

module.exports = tailwindConfig;
