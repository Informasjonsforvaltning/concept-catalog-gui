const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  context: path.join(__dirname),
  entry: [
    './src/index.tsx',
    'webpack-hot-middleware/client?reload=true'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: './bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000 } // Convert images < 10k to base64 strings
          }
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: {
          test: /\.tsx?$/
        },
        use: ['babel-loader', '@svgr/webpack', 'url-loader']
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.webpack.js', '.web.js']
  },
  resolveLoader: {
    modules: [__dirname, 'node_modules']
  },
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        REDUX_LOG: JSON.stringify(process.env.REDUX_LOG)
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new CopyWebPackPlugin(
      [
        { from: './src/assets/css/bootstrap*', to: './', flatten: true },
        { from: './src/assets/img/*', to: './img', flatten: true },
        { from: './dist/*', to: './static/', flatten: true }
      ],
      {
        copyUnmodified: true
      }
    )
  ]
};
