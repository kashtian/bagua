const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.client');
const vueConfig = require('./vue-loader.config');

vueConfig.loaders = {
    less: ExtractTextPlugin.extract({
        use: 'css-loader!less-loader',
        fallback: 'vue-style-loader'
    })
}

module.exports = Object.assign({}, baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        }),
        // extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new HTMLPlugin({
            template: 'src/index.template.html'
        }),
        new ExtractTextPlugin('[name].[contenthash:7].css'),
        // this is needed in webpack 2 for minifying CSS
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]   
});
