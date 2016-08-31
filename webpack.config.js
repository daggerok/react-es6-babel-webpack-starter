const
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano');

const Path = require('path');
const include   = [Path.resolve(process.cwd(), 'src')];
const bsInclude = [Path.resolve(process.cwd(), './node_modules/bootstrap/dist')];

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: './src/main.jsx'
  },
  output: {
    path: './dist/',
    filename: '/[name].js',
    // save maps outside build folder
    sourceMapFilename: 'maps/[file].map'
  },
  resolve: {
    extensions: ['', '.json', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            'react-html-attrs',
            'add-module-exports',
            'transform-class-properties',
            'transform-decorators-legacy'
          ]
        }
      }, {
        test: /\.css$/,
        include: bsInclude,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?importloader=1', 'postcss')
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        include: bsInclude,
        loader: 'file-loader'
      }, {
        test: /\.(woff|woff2)$/,
        include: bsInclude,
        loader:'url?prefix=font/&limit=5000'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        include: bsInclude,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        include: bsInclude,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ],

    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {test: /\.js$/, loader: 'source-map-loader'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-es6-babel-webpack-starter',
      template: './src/assets/index.html'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: true,
      compress: { warnings: false }
    }),
    new ExtractTextPlugin('/app.css'),
    new webpack.DefinePlugin({
      // Lots of library source code (like React) are based on process.env.NODE_ENV
      // (all development related code is wrapped inside a conditional that can be dropped if equal to "production"
      // this way you get your own react.min.js build)
      'process.env': { 'NODE_ENV': JSON.stringify('production') }
    })
  ],
  postcss: function() {
    return [
      autoprefixer,
      cssnano
    ]
  },
  node:{
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devServer: {
    inline: true,
    options: {
      watchOptions: 100
    },
    port: 3000,
    proxy: {
      '/author': 'http://localhost:8080',
      '/message': 'http://localhost:8080'
    }
  }
};
