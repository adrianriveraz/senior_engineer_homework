const path = require("path");

module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./index.tsx",
  output: {
    path: path.join(__dirname, "public"),
    filename: "./bundle.js",
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.jsx$/, loader: "babel-loader", exclude: /node_modules/ },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")],
  },
};
