import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

import { loadConfig, getConfig } from './config';
import { App } from './app/App';
import { configureRegistrationApi } from './api/concept-catalogue-api';
import { configurePublisherApi } from './api/publisher-api';
import { ErrorBoundary } from './components/error-boundary/error-boundary';

function AppRoot(): JSX.Element {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

async function configureServices() {
  configureRegistrationApi(getConfig().conceptRegistrationApi);
  configurePublisherApi(getConfig().publisherApi);
}

function render(): void {
  ReactDOM.render(AppRoot(), document.getElementById('root'));
}

loadConfig()
  .then(configureServices)
  .then(render)
  .catch(console.error);
