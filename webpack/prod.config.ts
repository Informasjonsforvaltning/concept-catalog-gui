import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import baseConfig from './base.config';

const configuration: Configuration = merge(baseConfig, {
  mode: 'production',
  target: ['web', 'es5'],
  output: {
    filename: '[name].[contenthash].js'
  }
});

export default configuration;
