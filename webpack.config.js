const { stat } = require('fs');
const path = require('path');
const { start } = require('repl');


module.exports = {
    entry: {
        index: './asset/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module:{
        rules:[],
    },
    plugins: [],
    devServer: {
        static: path.resolve(__dirname, 'dist'),
    },
    mode: 'production',
}

