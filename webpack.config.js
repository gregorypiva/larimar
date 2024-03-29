const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      framework: path.resolve(__dirname, 'src/services/framework'),
      config: path.resolve(__dirname, 'config'),
      services: path.resolve(__dirname, 'src/services/')
    }
  },
  node: {
    fs: 'empty'
  },
  stats: 'errors-only',
  optimization: {
    minimize: false
  }
};