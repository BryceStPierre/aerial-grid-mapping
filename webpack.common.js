const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

require("dotenv").config();

module.exports = {
  entry: {
    main: "./src/js/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[contenthash:16].js",
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.(mp3|wav)$/, loader: "file-loader" },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Aerial Grid Mapping",
      description:
        "A side project that leverages Google Maps APIs and geometry to do grid mapping over top of satellite images.",
      template: "./src/index.html",
      inject: "body",
      apiKey: process.env.API_KEY,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new FaviconsWebpackPlugin("./src/assets/images/favicon.png"),
  ],
};
