var path = require('path');
var webpack = require('webpack');

var config = {
  devtool: 'eval',

  entry: './src/js/main.js',

  output: {
    path: 'build/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/build/'
  },

  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.js$/,
      loader: 'jsx-loader?harmony'
    }, {
      test: /\.scss$/,
      loader: [
        'style!css!sass?outputStyle=expanded',
        '&includePaths[]=', path.resolve(__dirname, './bower_components'),
        '&includePaths[]=', path.resolve(__dirname, './node_modules')
      ].join('')
    }]
  },

  resolve: {
    root: [path.join(__dirname, "bower_components")]
  },

  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
  ]
};


module.exports = config;
