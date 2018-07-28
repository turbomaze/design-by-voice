const path = require('path');
const outputDirectory = '/';

module.exports = {
  entry: {
    'public/bundle': './public/index.js',
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
