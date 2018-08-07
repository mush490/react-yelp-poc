const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
    // Inform webpack that we are building a bundle for node.js rather than the browser
    target: 'node',

    //tell webpack the root file of our app
    entry: './src/index.js',

    // tell webpack where to put the output file that is genereated
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'), //__dirname refers to the current project directory. build is the output directory
    },

    externals: [webpackNodeExternals()]  // anything that is in the node_modules folder will not be included in bundle.js
};

module.exports = merge(baseConfig, config);