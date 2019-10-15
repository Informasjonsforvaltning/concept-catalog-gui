import React from 'react';
import { shallow } from 'enzyme';
import { HelpText } from './help-text.component';

test('should render HelpText', (): void => {
  const defaultProps = {
    title: 'Title',
    helpTextAbstract: 'Abstract',
    helpTextDescription: 'Description',
    required: false
  };
  const wrapper = shallow(<HelpText {...defaultProps} />);
  expect(wrapper).toMatchSnapshot();
});
