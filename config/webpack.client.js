const postcss = [
    require('autoprefixer')({
        browsers: [
			'Android >= 4',
			'Chrome >= 35',
			'Firefox >= 31',
			'iOS >= 7',
			'Opera >= 12',
			'Safari >= 7.1',
		]
    })
]

module.exports = {
    entry: {
        app: './src/client-entry.js',
        vendor: [
            'vue',
            'vue-router',
            'vuex',
            'vuex-router-sync'
        ]
    },
    resolve: {
        extensions: ['', '.vue', '.js']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: { postcss }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[hash:7].[ext]'
                }
            }
        ]
    },
    postcss
}