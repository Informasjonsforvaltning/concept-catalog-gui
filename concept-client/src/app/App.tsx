import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello } from '../components/Hello';

ReactDOM.render(
  <div>
    <Hello compiler="Typescript" framework="React" bundler="Webpack" />
  </div>,
  document.getElementById('root')
);
