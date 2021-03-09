const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const babelConfig = require("./babel.config.json");

const config = (dir = __dirname) => ({
    entry: "./assets/main.js",
    output: {
        path: path.resolve(dir, "./js"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".js"],
        alias: {
            "@": path.resolve(dir, "./js"),
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../style.css",
            chunkFilename: "[id].css",
        }),
        // new CopyPlugin([
        //     {
        //         from: path.resolve(dir, "./assets/img/**/*"),
        //         context: path.resolve(dir, "./assets/img"),
        //         to: "./img",
        //     },
        // ]),
    ],
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        include: path.resolve(dir, "./assets/js"),
                        use: {
                            loader: "babel-loader",
                            options: babelConfig,
                        },
                    },
                    {
                        test: /\.css$/i,
                        use: ["style-loader", "css-loader"],
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    url: false,
                                },
                            },
                            // Allow loading SCSS from NPM packages
                            {
                                loader: "sass-loader",
                                options: {
                                    sassOptions: {
                                        includePaths: [
                                            "./assets/sass",
                                            "./node_modules",
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                    {
                        include: /\.(jpg|png|gif|svg)$/,
                        loader: require.resolve("file-loader"),
                        options: {
                            name: "[path][name].[ext]",
                            context: path.resolve("./assets/img"),
                        },
                        exclude: /assets\/font/,
                    },
                    {
                        test: /\.(otf|ttf|woff2?|svg|eot)$/,
                        loader: require.resolve("file-loader"),
                        options: {
                            name: "./fonts/[name].[ext]",
                        },
                        exclude: /assets\/img/,
                    },
                ],
            },
        ],
    },
});

module.exports = config;
