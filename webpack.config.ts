import * as Path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import { Configuration, DefinePlugin, Output } from "webpack";
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;
const ENV_DEVELOPMENT = NODE_ENV === "development";
const ENV_PRODUCTION = NODE_ENV === "production";

const output: Output = (ENV_PRODUCTION) ? {
        path: Path.resolve(__dirname, "docs"),
        filename: "[name].js",
    } : {
        path: Path.resolve(__dirname, "build"),
        filename: "[name].[chunkhash].js",
    };

const config: Configuration = {
    entry: {
        bundle: "./app.ts",
    },
    output,
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: "pre",
                use: "tslint-loader",
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader", "ts-loader"],
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
        extensions: [".tsx", ".ts", ".js"],
    },
    devtool: (ENV_PRODUCTION) ? "source-map" : "inline-source-map",
    plugins: [
        new DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
        }),
        new HtmlWebpackPlugin({
            template: "index.html",
            inject: "head",
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
        new ExtractTextPlugin((ENV_PRODUCTION) ? "[name].[contenthash].css" : "[name].css"),
    ],
};

module.exports = config;
