const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        web3: "./packages/web3/lib/index.js",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map",
        }),
    ],
    module: {
        rules: [
          {
            use: 'ts-loader',
          },
        ],
      },
    resolve: {
        modules: ["node_modules"],
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(__dirname, "dist"),
        library: "Web3",
        libraryTarget: "umd",
    },
};