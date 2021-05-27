const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

require("dotenv").config();

module.exports = {
  mode: "production",
  devServer: {
    contentBase: "./dist",
  },
  entry: {
    main: "./src/js/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(mp3|wav)$/, loader: "file-loader" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Aerial Grid Mapping",
      template: "./src/index.html",
      apiKey: process.env.API_KEY,
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
};
