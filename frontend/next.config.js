// next configure file

module.exports = {
  images: {
    domains: [],
  },
  loaders: [
    {
      test: /\.js?$/,
      loader: "babel",
      exclude: /node_modules/,
    },
  ],
};
