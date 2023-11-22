export const indexJs = `import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(<RouterProvider router={router} />);`

export const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React App without CRA</title>
</head>
<body>    
  <div id="root"></div>
</body>
</html>`

export const webpackConfig = `const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: { historyApiFallback: true },
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
}`

export const gitignore = `node_modules`