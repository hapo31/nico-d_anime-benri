const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
        rules: [
            {
                test: /\.tsx?$/,  // 読み込むファイルのマッチ条件。
                use: ["ts-loader"]
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        "sass-loader",
                        "css-loader",
                    ]
                }),
            }
        ],
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: "static/*/**",
        }]),
        new ExtractTextPlugin({
            filename: "styles.css",
            allChunks: true,
        })
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