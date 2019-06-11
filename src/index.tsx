import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

import { loadConfig } from './config';
import { App } from './app/App';

function AppRoot(): JSX.Element {
  return <App />;
}

function render(): void {
  ReactDOM.render(AppRoot(), document.getElementById('root'));
}

loadConfig()
  .then(render)
  .catch(console.error);
