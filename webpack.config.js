const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './asset/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]

  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Ricerca Libri per Categoria',
      template: './asset/index.html',
    })
  ],
  devServer: {
    port: 3000,
    open: true,
    static: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
};
