const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
/**
  new UglifyJsPlugin({
    test: /\.js($|\?)/i,
    sourceMap: true,
    uglifyOptions: {
        compress: true
    }
  })
  */
const plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "./docs/src/index.html"),
    hash: false,
    filename: "index.html",
    inject: "body",
    minify: {
      collapseWhitespace: true,
      removeComments: true
    },
  }),
  new InlineChunkWebpackPlugin({
      inlineChunks: ['manifest']
  }),
  new AutoDllPlugin({
    inject: true, // will inject the DLL bundles to index.html
    filename: '[name].dll.js',
    entry: {
      vendor: [
        'react',
        'react-dom'
      ]
    }
  })
]

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      path.join(__dirname, './docs/src/main.js'),
    ],
  },

  output: {
    publicPath: "/",
    path: path.join(__dirname, "./docs"),
    filename: `js/[name].[hash].js`,
    chunkFilename: "js/[chunkhash].js"
  },

  module: {
    rules: [{
      test: /\.js/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader"
      }]
    }]
  },

  resolve: {
    extensions: ['.js']
  },

  plugins,

  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "docs"),
  }
};
