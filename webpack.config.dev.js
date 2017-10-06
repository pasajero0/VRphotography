const path    = require('path');
const webpack = require('webpack');

const args = require('minimist')(process.argv);
const devTools = args['d'];

config = {
    context : __dirname,
    cache: true,
    entry   : {
        'Bundle': [
            'webpack-hot-middleware/client',
            './index.js'
        ],
        'Vendors': [
            'react',
            'react-dom',
            'lodash'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
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
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name     : 'Vendors',
            filename : 'Vendors.js',
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            'window._': 'lodash',
            _         : 'lodash'
        }),
        new webpack.ProvidePlugin({
            fetch  : 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        }),
        new webpack.DefinePlugin({
            __DEVELOPMENT__: true,
            __PRODUCTION__: false,
            __DEVTOOLS__: JSON.parse(devTools || false)
        })
    ]
};

module.exports = config;
