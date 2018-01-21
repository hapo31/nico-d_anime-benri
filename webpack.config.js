const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require("path");

const isDev = process.env.NODE_ENV.indexOf("DEV") >= 0;

const devOption = require("./webpack/dev");
const prodOption = require("./webpack/prod");

const options = isDev ? devOption : prodOption;

console.log("isDev:", isDev);
console.log("output:", options.outputDir);

const webpackConfig = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, options.outputDir),
        filename: "script.js",
    },
    devtool: options.devtool,
    module: {
        loaders: [
            {
                loader: "ts-loader", // 読み込んだファイルを渡すプラグイン名
                test: /\.tsx?$/,  // 読み込むファイルのマッチ条件。
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: "static/manifest.json",
        }, {
            from: "static/icon.ico",
        }
        ]),
    ]
};

if (!isDev) {
    webpackConfig.plugins.push(
        new UglifyJsPlugin({
            uglifyOptions: {
                ecma: 8,
                output: {
                    comments: false
                }
            }
        })
    );
}

module.exports = webpackConfig;