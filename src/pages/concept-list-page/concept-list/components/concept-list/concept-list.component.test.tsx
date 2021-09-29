import React from 'react';
import { shallow } from 'enzyme';
import { ConceptList } from './index';
import conceptItems from '../../../../../mock/concepts.json';
import { Concept } from '../../../../../types';

test('should render ConceptList', (): void => {
  const wrapper = shallow(<ConceptList items={conceptItems as Concept[]} />);
  expect(wrapper).toMatchSnapshot();
});
