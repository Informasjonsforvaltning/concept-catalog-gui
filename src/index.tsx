import React from 'react';
import ReactDOM from 'react-dom';

import { loadConfig } from './config';
import { App } from './app/App';
import { ErrorBoundary } from './components/error-boundary/error-boundary';
import { initAuth } from './auth/auth-service';
import { initAbilities } from './casl/ability';

const render = () =>
  ReactDOM.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
    document.getElementById('root')
  );

async function main() {
  await loadConfig();
  const authenticated = await initAuth();
  if (authenticated) {
    initAbilities();
    render();
  }
}

main().catch(console.error);
