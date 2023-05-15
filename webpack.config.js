const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    admin_login: {
      import: "./webpack/pages/admin_login/Main.tsx",
      dependOn: "shared",
    },
    shared: ["solid-js", "solid-js/web"],
    rng: "./webpack/pages/rng/Main.tsx",
    sidebar: "./webpack/scripts/sidebar.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "public/js"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
  },
  mode: "production",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            configFile: false,
            presets: ["@babel/preset-env", "solid", "@babel/preset-typescript"],
            plugins: ["@babel/plugin-syntax-dynamic-import"],
          },
        },
      },
    ],
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //   },
  // },
  // plugins: [
  //   new HtmlWebpackPlugin()
  // ]
};

module.exports = config;
