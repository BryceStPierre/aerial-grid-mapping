const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");

const config = {
  mode: "development",
  devServer: {
    contentBase: "./dist",
    compress: true,
    https: true,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

module.exports = merge(commonConfig, {
  ...config,
});
