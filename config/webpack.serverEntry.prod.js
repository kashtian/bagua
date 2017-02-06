const webpack = require('webpack');
const config = require('./webpack.serverEntry');

module.exports = Object.assign({}, config, {
    plugins: config.plugins.concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        })
    ])
})