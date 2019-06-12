import React from 'react';
import { shallow } from 'enzyme';
import { Hello } from './Hello';

let defaultProps;

test('should render Hello', (): void => {
  defaultProps = {
    framework: 'React',
    compiler: 'node',
    bundler: 'webpack'
  };
  shallow(<Hello {...defaultProps} />);
});
