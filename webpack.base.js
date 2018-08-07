module.exports = {
        // tell webpack to run on every file it runs through
        module: {
            rules: [
                {
                    test: /\.js?$/, // regex to run only on js files
                    loader: 'babel-loader',  // babel webpack module
                    exclude: /node_modules/,  //regex to tell webpack to skip this directory
                    options: {
                        presets: [
                            'react',
                            'stage-0',
                            ['env', { targets: {browsers: ['last 2 versions']}}] // transpile using rules for the last 2 versions of popular browsers
                        ]
                    }
                }
            ]
        }
}