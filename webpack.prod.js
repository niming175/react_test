const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (env, argv) {
  const isEnvDevelopment = argv.mode === 'development' || !argv.mode;
  const isEnvProduction = argv.mode === 'production';

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    devtool: isEnvDevelopment ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',
    entry: './src/index.js',
    output: {
      filename: 'dist/bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }, {
          test: /\.js$/,
          exclude: /node_modules/,
          enforce: 'pre',
          use: 'eslint-loader'
        }, {
          test: /\.css$/,
          include: [path.resolve(__dirname, 'src/styles'), /node_modules/],
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }, {
          test: /\.css$/,
          exclude: [path.resolve(__dirname, 'src/styles'), /node_modules/],
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader?modules'
          ]
        }, {
          test: /\.less$/,
          include: [path.resolve(__dirname, 'src/styles'), /node_modules/],
          use: ['style-loader', 'css-loader', 'less-loader']
        }, {
          test: /\.less$/,
          exclude: [path.resolve(__dirname, 'src/styles'), /node_modules/],
          use: [
            'style-loader',
            'css-loader?modules',
            'less-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader"
            }
          ]
        },
        { 
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10000
              }
            }
          ]
        }
      ]
    },

    // 插件
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].chunk.css',
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve('src')
      }
    }
  };
}
