const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: ['./src/index.tsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    host: '0.0.0.0',
    port: 8203,
    historyApiFallback: true,
    before: app =>
      app.get('/env.json', (_, res) =>
        res.json({
          CONCEPT_REGISTRATION_API: process.env.CONCEPT_REGISTRATION_API || 'http://localhost:8200',
          REGISTRATION_HOST: process.env.REGISTRATION_HOST || 'https://localhost:8098',
          PUBLISHER_API: process.env.PUBLISHER_API || 'http://localhost:8080',
          PUBLISHER_DATA_AUTHORIZATION: process.env.PUBLISHER_DATA_AUTHORIZATION || '',
          // PUBLISHER_API:'https://www.ut1.fellesdatakatalog.brreg.no'
          // PUBLISHER_DATA_AUTHORIZATION:'Basic ZmRrOkJSUkVH' // for ut1 and st1
          SSO_HOST: process.env.SSO_HOST || 'http://localhost:8084'
        })
      )
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
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new CopyWebpackPlugin([{ from: './src/assets/img/*', to: './img', flatten: true }], {
      copyUnmodified: true
    })
  ]
};
