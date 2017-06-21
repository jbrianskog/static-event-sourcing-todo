const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;
const ENV_DEVELOPMENT = NODE_ENV === "development";
const ENV_PRODUCTION = NODE_ENV === "production";

module.exports = {
    entry: {
        bundle: "./app.ts",
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
    },
    module: {
        rules: [
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
    devtool: "inline-source-map",
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
    ],
};

if (ENV_PRODUCTION) {
    module.exports.output.path = path.resolve(__dirname, "docs");
    module.exports.output.filename = "[name].[chunkhash].js";
    module.exports.plugins.push(new ExtractTextPlugin("[name].[contenthash].css"));
    module.exports.devtool = "source-map";
} else {
    module.exports.plugins.push(new ExtractTextPlugin("[name].css"));
}
