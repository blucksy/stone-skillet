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
      colors: {
        skillet: "#c5e0f2",
      },
      borderRadius: {
        DEFAULT: "12px",
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
