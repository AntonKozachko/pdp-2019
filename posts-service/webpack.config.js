const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const baseCfg = {
  name: 'posts-service',
  target: 'node',
  cache: true,
  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          /\.(spec|e2e)\.js$/,
          /node_modules/,
        ],
      },
    ],
    noParse: [
      /\.(spec|e2e)\.js$/,
      /LICENSE/,
      /README.md/,
    ],
  },
  entry: {
    bundle: './src/index.js',
  },
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    process: true,
    console: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    __dirname: false,
    __filename: false,
  },
};

const pluginsCfg = {
  plugins: [
    new LoaderOptionsPlugin({
      debug: true,
    }),
  ],
};

console.log('Building posts-service bundle...');
console.log(`[${process.env.NODE_ENV}] config used...`);

let finalCfg;
if (process.env.NODE_ENV === 'production') {
  // minification not used because it does not work (
  finalCfg = webpackMerge(baseCfg, pluginsCfg);
} else {
  finalCfg = webpackMerge(baseCfg, pluginsCfg, {
    devtool: 'inline-source-map',
  });
}

module.exports = finalCfg;
