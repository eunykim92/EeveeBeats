const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  mode: process.env.NODE_ENV || 'development',
  output: {
<<<<<<< HEAD
    path: path.join(__dirname, 'build'),
=======
    path: path.join(__dirname, 'dist'),
>>>>>>> origin/dev
    filename: 'bundle.js',
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './client/index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|mp3)$/,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: {
<<<<<<< HEAD
      directory: path.join(__dirname, './build'),
=======
      directory: path.join(__dirname, 'dist'),
>>>>>>> origin/dev
    },
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
