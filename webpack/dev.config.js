import merge from 'webpack-merge';
import ErrorOverlayPlugin from 'error-overlay-webpack-plugin';
import baseConfig from './base.config';

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8203,
    historyApiFallback: true,
    before: app => app.get('/config.js', (_, res) => res.status(204).send())
  },
  plugins: [new ErrorOverlayPlugin()]
});
