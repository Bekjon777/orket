const polyfill = require('babel-polyfill');
const path = require('path');
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;

module.exports = () => ({
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    path.join(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['@babel/preset-env', { modules: false }],
                '@babel/react',
              ],
              plugins: ['react-hot-loader/babel'],
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        loader: 'style-loader',
      },
      {
        test: /\.(css|scss)$/,
        loader: 'css-loader',
      },
      {
        test: /\.(css|scss)$/,
        loader: 'sass-loader',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './src',
    hot: true,
  },
});
