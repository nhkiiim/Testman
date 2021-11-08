module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        bga: "url('https://w7.pngwing.com/pngs/535/506/png-transparent-atmosphere-sky-astronomy-black-star-get-snowing-s-miscellaneous-monochrome-computer-wallpaper.png')",
        bgb: "url('https://c4.wallpaperflare.com/wallpaper/399/42/347/astronaut-space-wallpaper-preview.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
