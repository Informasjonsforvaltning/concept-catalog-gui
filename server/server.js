const _ = require('lodash');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compression = require('compression');

module.exports = {
  start() {
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
        'REGISTRATION_HOST',
        'PUBLISHER_API',
        'PUBLISHER_DATA_AUTHORIZATION',
        'SSO_HOST'
      ];
      const values = vars.map(varName => process.env[varName]);
      const envObj = _.zipObject(vars, values);
      res.json(envObj);
    });

    app.use('/', express.static(path.join(__dirname, '/../dist')));

    app.get('*', (req, res) => {
      res.render('index');
    });

    app.listen(app.get('port'), () => {
      console.log('concept-client lytter på', app.get('port')); // eslint-disable-line no-console
    });
  }
};
