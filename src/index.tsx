import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

import { loadConfig, getConfig } from './config';
import { App } from './app/App';
import { configureRegistrationApi } from './api/concept-catalogue-api';

function AppRoot(): JSX.Element {
  return <App />;
}

async function configureServices() {
  configureRegistrationApi(getConfig().conceptRegistrationApi);
}

function render(): void {
  ReactDOM.render(AppRoot(), document.getElementById('root'));
}

loadConfig()
  .then(configureServices)
  .then(render)
  .catch(console.error);
