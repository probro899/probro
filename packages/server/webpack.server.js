const path = require('path');
const webConfig = require('./webConfig');
const webpackNodeExternals = require('webpack-node-externals');
const JsxstylePlugin = require('jsxstyle-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  // production || development
  mode: webConfig.environment,

  // Inform webpack that we're building a bundle
  // for nodeJS, rather then for the browser
  target: 'node',

  // Tell webpack the root file of our
  // server application
  entry: './server.js',

  // Tell webpack where to put the output file
  // that is generated

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', '..', '..', 'client', 'packages', 'server', 'build'),
    publicPath: '/build',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
        },
        {
          loader: JsxstylePlugin.loader,
        },
        ],
      },
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
  },

  // Tell webpack not to bundle any libraries that exist in the 'node_modules' folder
  // into the server bundle
  externals: [webpackNodeExternals(), {
    canvas: 'commonjs canvas',
    sharp: 'commonjs sharp',
    sqlite3: 'commonjs sqlite3',
  }],
  plugins: [
    new CopyWebpackPlugin([
      { from: './server/src/db/migrations', to: './migrations' },
    ]),
    new JsxstylePlugin(),
  ],
};
