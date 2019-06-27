const _ = require('lodash');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compression = require('compression');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.dev.config.js');
require('dotenv').config();

module.exports = {
  start() {
    const env = {
      production: process.env.NODE_ENV === 'production'
    };

    const app = express();
    app.use(compression());
    app.set('view engine', 'ejs');
    app.set('views', `${__dirname}/views`);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    const port = Number(process.env.PORT || 3111);
    app.set('port', port);

    app.use('/env.json', (req, res) => {
      const vars = [
        'CONCEPT_REGISTRATION_API',
        'PUBLISHER_API',
        'PUBLISHER_DATA_AUTHORIZATION',
        'REGISTRATION_HOSTNAME'
      ];
      const values = vars.map(varName => process.env[varName]);
      const envObj = _.zipObject(vars, values);
      res.json(envObj);
    });

    app.use('/begreper', (req, res) => {
      let jsonObj = require('../src/mock/concepts.json');
      res.json(jsonObj);
    });

    app.use('/begrep/:id', (req, res) => {
      let jsonObj = require('../src/mock/concepts.json');

      res.json(_.find(jsonObj, {id: req.params.id}));
    });

    if (!env.production) {
      const compiler = webpack(config);
      app.use(
        webpackMiddleware(compiler, {
          publicPath: config.output.publicPath,
          contentBase: 'src',
          stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
          }
        })
      );
      app.use(webpackHotMiddleware(compiler));
    } else {
      app.use('/', express.static(path.join(__dirname, '/../dist')));
    }
    app.get('*', (req, res) => {
      res.render('index');
    });

    app.listen(app.get('port'), () => {
      console.log('concept-client lytter på', app.get('port')); // eslint-disable-line no-console
      console.log('env:', env.production ? 'production' : 'development'); // eslint-disable-line no-console
    });
  }
};
