import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

import { getConfig, loadConfig } from './config';
import { App } from './app/App';
import { configureRegistrationApi } from './api/registration-api';

function AppRoot(): JSX.Element {
  return <App />;
}

async function configureServices(): Promise<void> {
  configureRegistrationApi(getConfig().conceptRegistrationApi);
}

function render(): void {
  ReactDOM.render(AppRoot(), document.getElementById('root'));
}

loadConfig()
  .then(configureServices)
  .then(render)
  .catch(console.error);
