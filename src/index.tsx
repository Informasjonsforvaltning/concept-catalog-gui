import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

import { loadConfig } from './config';
import { App } from './app/App';
import { ErrorBoundary } from './components/error-boundary/error-boundary';
import { initAuth } from './auth/auth-service';

const render = () =>
  ReactDOM.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
    document.getElementById('root')
  );

loadConfig()
  .then(initAuth)
  .then(render)
  .catch(console.error);
