import merge from 'webpack-merge';
import baseConfig from './base.config';

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js'
  }
});
