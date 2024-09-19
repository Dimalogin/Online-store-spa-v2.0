const path = require("path");
const { resolve } = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (argv, env) => {
  return {
    target: "web",
    mode: "development",
    devtool: "source-map",
    entry: {
      main: "./src/index",
    },
    output: {
      path: resolve(__dirname, "./dist"),
      filename: "[name].[contenthash].js",
      clean: true,
    },

    resolve: {
      extensions: [".ts", ".js"],
    },

    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: "asset/resource",
          generator: {
            filename: "./images/[hash][ext]",
          },
        },
        {
          test: /\.ts$/,
          use: "ts-loader",
        },
        {
          test: /\.s?css$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          dependency: { not: ["url"] },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./src/index.html" }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: resolve(__dirname, "./src/images"),
            to: resolve(__dirname, "./dist/images"),
          },
          {
            from: resolve(__dirname, "./src/fonts"),
            to: resolve(__dirname, "./dist/fonts"),
          },
        ],
      }),
    ],

    devServer: {
      open: true,
      host: "localhost",
      port: 3000,
      hot: true,
      static: path.resolve(__dirname, "./dist"),
      historyApiFallback: true,
    },
  };
};
