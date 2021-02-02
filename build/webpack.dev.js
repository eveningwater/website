const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');


module.exports = merge(common, {
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, '../'),
        inline: true,
        hot: true,
        stats: "minimal",
        overlay: true,
        injectClient: false,
        disableHostCheck: true
    },
    mode: "development",
    devtool: 'inline-source-map',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
})