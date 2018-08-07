const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
    //tell webpack the root file of our app
    entry: './src/client/client.js',

    // tell webpack where to put the output file that is genereated
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'), //__dirname refers to the current project directory. public is the output directory
    },
};

module.exports = merge(baseConfig, config);