const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (env, argv) {
  const isEnvDevelopment = argv.mode === 'development' || !argv.mode;
  const isEnvProduction = argv.mode === 'production';

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    devtool: isEnvDevelopment ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }]
    },
    // devServer配置
    devServer: {
      contentBase: './dist',
    },

    // 插件
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
    ]
  };
}
