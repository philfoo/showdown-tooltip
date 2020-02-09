var path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/controller.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'bundle.js'
  }
};