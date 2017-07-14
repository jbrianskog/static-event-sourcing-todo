import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as Path from "path";
import { Configuration, DefinePlugin, Output, Plugin } from "webpack";
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const ENV_DEVELOPMENT = NODE_ENV === "development";
const ENV_PRODUCTION = NODE_ENV === "production";

const output: Output = (ENV_PRODUCTION)
  ? {
    path: Path.resolve(__dirname, "docs"),
    filename: "[name].[chunkhash].js",
  } : {
    path: Path.resolve(__dirname, "build"),
    filename: "[name].js",
  };

const plugins: Plugin[] = [
  new DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
  }),
  new HtmlWebpackPlugin({
    template: "index.ejs",
    inject: "head",
    env: NODE_ENV,
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: "defer",
  }),
  new CopyWebpackPlugin([
    { from: "assets" },
  ]),
  new FaviconsWebpackPlugin({
    logo: "./favicon.png",
    persistentCache: !ENV_PRODUCTION,
  }),
  new ExtractTextPlugin((ENV_PRODUCTION) ? "[name].[contenthash].css" : "[name].css")
];

if (ENV_PRODUCTION) {
  plugins.push(new UglifyJSPlugin({
    sourceMap: true
  }))
}

const config: Configuration = {
  entry: {
    bundle: "./app.tsx",
  },
  output,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: "pre",
        use: "tslint-loader",
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader",
        }),
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ],
  },
  devtool: (ENV_PRODUCTION) ? "source-map" : "inline-source-map",
  plugins: plugins,
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
};

module.exports = config;
