var path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/content.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'bundle.js'
  }
};