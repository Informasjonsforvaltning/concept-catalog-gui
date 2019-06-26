import React from 'react';
import { shallow } from 'enzyme';
import { ConceptList } from './concept-list.component';
import conceptItems from '../../../mock/concepts.json';

test('should render ConceptList', (): void => {
  const wrapper = shallow(<ConceptList items={conceptItems} />);
  expect(wrapper).toMatchSnapshot();
});
