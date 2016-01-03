var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.less'],
    root: [
      path.resolve('./src')
    ]
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], include: [path.join(__dirname, 'src')] }
    ]
  }
};
