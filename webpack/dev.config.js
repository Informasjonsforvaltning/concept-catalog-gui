const merge = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
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
  }
});
