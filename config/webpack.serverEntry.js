const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.client');
const nodeExternals = require('webpack-node-externals');

module.exports = Object.assign({}, baseConfig, {
    target: 'node',
    entry: './src/server-entry.js',
    output: {
        path: path.join(process.cwd(), 'dist/server'),
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },    
    externals: [nodeExternals()],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        })
    ]
})