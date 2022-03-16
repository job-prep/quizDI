const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { env } = require('process');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: path.join(__dirname, "client", "main.js"),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "client", "index.html"),
        }),
    ],

    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.s?css/,
          use: [
            'style-loader', 'css-loader', 'sass-loader'
          ]
        }
      ]
    },
    
    devServer: {
      static: {
        publicPath: '/dist',
        directory: path.resolve(__dirname, 'dist'),
      },
      host: 'localhost',
      port: 8080,
      proxy: { 
        '/': 'http://localhost:3000',
        // '/api': 'http://localhost:3000', 
        // '/auth': 'http://localhost:3000', 
        // '/assets' : 'http://localhost:3000' 
      },
      compress: true,
      hot: true
    }
}