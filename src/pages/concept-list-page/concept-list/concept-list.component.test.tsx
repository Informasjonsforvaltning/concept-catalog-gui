import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import { ConceptList } from './concept-list.component';
import conceptItems from '../../../mock/concepts.json';

test('should render ConceptList', (): void => {
  const wrapper = shallow(<ConceptList items={_.get(conceptItems, 'concepts')} />);
  expect(wrapper).toMatchSnapshot();
});
