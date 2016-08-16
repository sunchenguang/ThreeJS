/**
 * Created by suncg on 2016/8/16.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, './entry.js'),
    output: {
        filename: './build/output.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'],
                    compact: false
                }

            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.OldWatchingPlugin()
    ],


};



















