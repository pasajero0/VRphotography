const path    = require('path');
const webpack = require('webpack');

config = {
    context : __dirname,
    watch   : true,

    entry   : {
        'Bundle': [
            './index.js'
        ]
    },
    node: {
      fs : 'empty',
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    }, 
    output: {
        path: __dirname+"/src/js/dist/",
        publicPath : '/assets/',
        filename: "[name].js",
        chunkFilename: "[id].chunk.js",
    },
    module: {
        rules: [
            {
                test   : /\.js$/,
                use : [`babel-loader`],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.DefinePlugin({
            __DEVELOPMENT__: false,
            __PRODUCTION__: true,
            __DEVTOOLS__: false
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences   : true,
                booleans    : true,
                loops       : true,
                unused      : true,
                warnings    : false,
                drop_console: true,
                unsafe      : true
            }
        })
    ]
};

module.exports = config;
