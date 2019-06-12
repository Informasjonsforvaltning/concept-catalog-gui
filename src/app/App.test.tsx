import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

test('should render App', (): void => {
  shallow(<App />);
});
