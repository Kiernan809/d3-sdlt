var ExtractTextPlugin = require('extract-text-webpack-plugin')
,   path = require('path')
,   webpack = require('webpack');

var config = {
  devtool: 'eval',

  entry: './src/js/main.js',

  output: {
    path: './build',
    // path: process.env.NODE_ENV === 'production' ? './dast' : './build',
    filename: 'build.js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__compiled/'
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
        loader: ExtractTextPlugin.extract(
          'style-loader', 'css-loader!sass-loader?outputStyle=expanded' +
          '&includePaths[]='+ (path.resolve(__dirname, './bower_components')) +
          '&includePaths[]='+ (path.resolve(__dirname, './node_modules'))
        )
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },

  resolve: {
      root: [ path.join(__dirname, 'bower_components') ],
      alias: {
        // 'React' : path.join(__dirname, 'bower_components', 'react' )
      }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),

    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),

    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    )
  ]
};

module.exports = config;
