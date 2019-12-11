import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BaseHrefWebpackPlugin } from 'base-href-webpack-plugin';

export default {
  entry: {
    main: './src/entrypoints/main/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      hidePathInfo: true,
      chunks: 'all',
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      minSize: 0,
      automaticNameDelimiter: '.',
      cacheGroups: {
        default: false,
        mainVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'main.vendors',
          filename: '[name].bundle.js',
          chunks: ({ name }) => name === 'main'
        }
      }
    }
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
  plugins: [
    new CleanWebpackPlugin(),
    new (class ChunksFromEntryPlugin {
      apply(compiler) {
        compiler.hooks.emit.tap('ChunksFromEntryPlugin', compilation => {
          compilation.hooks.htmlWebpackPluginAlterChunks.tap('ChunksFromEntryPlugin', (_, { plugin }) =>
            compilation.entrypoints.get(plugin.options.entry).chunks.map(chunk => ({
              names: chunk.name ? [chunk.name] : [],
              files: chunk.files.slice(),
              size: chunk.modulesSize(),
              hash: chunk.hash
            }))
          );
        });
      }
    })(),
    new HtmlWebpackPlugin({
      entry: 'main',
      template: './src/entrypoints/main/index.html',
      filename: 'index.html',
      favicon: './src/assets/img/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new CopyWebpackPlugin([{ from: './src/assets/img/*', to: './img', flatten: true }], {
      copyUnmodified: true
    }),
    new BaseHrefWebpackPlugin({
      baseHref: '/'
    })
  ]
};
