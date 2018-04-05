const {mapValues} = require('lodash');
const package = require('./package.json');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
  externals: mapValues(package.dependencies, (value, key) => {
    return `commonjs ${key}`;
  }),
  node: {
    __filename: false,
    __dirname: false,
    fs: 'empty',
  },
};