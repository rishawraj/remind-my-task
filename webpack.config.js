const path = require("path");

module.exports = {
  entry: {
    content: "./src/content/index.ts",
    background: "./src/background/index.ts",
    popup: "./src/popup/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true, // This will clean the dist folder before each build
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  optimization: {
    // Ensures output is CSP compliant
    minimize: false,
  },
  devtool: false, // Prevents eval usage in source maps
};
