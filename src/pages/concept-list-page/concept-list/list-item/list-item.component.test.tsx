import React from 'react';
import { shallow } from 'enzyme';
import { ListItem } from './list-item.component';

let defaultProps;

beforeEach(() => {
  defaultProps = {
    col1: 'column1',
    col2: 'column2',
    col3: 'column3',
    path: '/tester'
  };
});

test('should render ListItem with status DRAFT', (): void => {
  const wrapper = shallow(<ListItem {...defaultProps} status='DRAFT' />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ListItem with status PUBLISH', (): void => {
  const wrapper = shallow(<ListItem {...defaultProps} status='PUBLISH' />);
  expect(wrapper).toMatchSnapshot();
});
