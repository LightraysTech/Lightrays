const path = require('path');

module.exports = {
  entry: './main.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'Lightrays.js',
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};