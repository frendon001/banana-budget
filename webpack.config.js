const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './app/index.tsx',
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Banana Budget App',
      template: './app/public/index.html',
      favicon: './app/public/favicon.ico',
      appMountId: 'root',
    }),
  ],
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'app'), 'shared'],
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.module\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { modules: true, localsConvention: 'camelCaseOnly' },
          },
        ],
      },
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg)$/,
        use: 'file-loader',
      },
    ],
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:3030',
    },
    contentBase: path.join(__dirname, './build'),
    historyApiFallback: true,
  },
};
