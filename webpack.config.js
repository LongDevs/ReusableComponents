const { resolve } = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: './js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: resolve(__dirname, ''),
            },
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: 'img/',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/index.html'),
      chunks: ['index'],
      filename: resolve(__dirname, 'build/index.html'),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: './css/[name].css',
      chunkFilename: '[id].css',
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${resolve(__dirname, 'src')}/*`, {
        nodir: true,
      }),
      content: ['./src/index.html'],
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    writeToDisk: true,
    port: 9000,
  },
};
