const {mapValues} = require('lodash');
const pkg = require('./package.json');

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
  externals: mapValues(pkg.dependencies, (value, key) => {
    return `commonjs ${key}`;
  }),
  node: {
    __filename: false,
    __dirname: false,
  },
};
