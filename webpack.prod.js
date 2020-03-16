const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Banana Budget App',
      template: './app/public/index.html',
      favicon: './app/public/favicon.ico',
      appMountId: 'root',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'initial',
      //   cacheGroups: {
      //     vendor: {
      //       test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
      //       name: 'vendor',
      //       chunks: 'all',
      //     },
      //   },
    },
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
});
