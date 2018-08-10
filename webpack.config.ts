import * as path from 'path';
import * as webpack from 'webpack';
// tslint:disable-next-line:no-var-requires
const slsw = require('serverless-webpack');
import * as nodeExternals from 'webpack-node-externals';

// tslint:disable-next-line:no-var-requires
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const stage = slsw.lib.options.stage;

const mode = stage === 'production' ? 'production' : 'development';

const config: webpack.Configuration = {
  mode: mode,
  devtool: 'source-map',
  target: 'node',
  stats: 'minimal',
  entry: Object.keys(slsw.lib.entries).reduce(
    (entries: { [x: string]: any }, key) => {
      entries[key] = ['./source-map-install.js', slsw.lib.entries[key]];
      return entries;
    },
    {},
  ),
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  externals: [nodeExternals()]
};

module.exports = config;
