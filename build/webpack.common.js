const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/dist/plugin').default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const babelConfig = {
    cacheDirectory: true,
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: [
                        'last 2 versions',
                        'Firefox ESR',
                        '> 1%',
                        'ie >= 11',
                        'iOS >= 8',
                        'Android >= 4',
                    ],
                },
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        ['@vue/babel-plugin-jsx', { mergeProps: false }]
    ],
};
module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images',
                        limit: 10000
                    }
                }
            },
            {
                test: /\.ts|tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelConfig,
                    },
                    {
                        loader: 'ts-loader',
                        options: { appendTsSuffixTo: [/\.vue$/] }
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: babelConfig,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', {
                    loader: "css-loader",
                    options: {
                        esModule: false
                    }
                }, 'less-loader']
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "markdown-loader",
                        options: {
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            vue$: '@vue/runtime-dom',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.md'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '夕水的个人网页',
            template: 'index.html',
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
}