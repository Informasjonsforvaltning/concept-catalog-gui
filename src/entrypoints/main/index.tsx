import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from '@fellesdatakatalog/theme';

import GlobalStyles from '../../app/styles';
import { App } from '../../app/App';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary';
import { authService } from '../../services/auth-service';
import { initAbilities } from '../../casl/ability';

async function main() {
  const authenticated = await authService.init({ loginRequired: true });
  if (authenticated) {
    initAbilities();
    ReactDOM.render(
      <ThemeProvider>
        <GlobalStyles />
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ThemeProvider>,
      document.getElementById('root')
    );
  }
}

main().catch(() => {});

if ((module as any).hot) {
  (module as any).hot.accept();
}
