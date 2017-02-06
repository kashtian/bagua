const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.client');

baseConfig.entry.app.push('webpack-hot-middleware/client');
baseConfig.output.filename = '[name].js';

module.exports = Object.assign({}, baseConfig, {
    devtool: '#source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HTMLPlugin({
            template: 'src/index.template.html'
        })
    ]
});