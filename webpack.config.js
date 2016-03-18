const
webpack = require('webpack'),
ExtractTextPlugin = require('extract-text-webpack-plugin'),
autoprefixer = require('autoprefixer'),
cssnano = require('cssnano')

module.exports = {
  context: __dirname,
  devtool: 'cheap-inline-module-source-map',
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.json', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?importloader=1', 'postcss')
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }, {
        test: /\.(woff|woff2)$/,
        loader:'url?prefix=font/&limit=5000'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: true,
      compress: { warnings: false }
    }),
    new ExtractTextPlugin('bundle.css')
  ],
  postcss: function() {
    return [
      autoprefixer,
      cssnano
    ]
  },
  devServer: {
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: true,
    port: 3000,
    historyApiFallback: true
  }
}
