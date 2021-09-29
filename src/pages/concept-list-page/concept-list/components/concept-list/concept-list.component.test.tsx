import React from 'react';
import { shallow } from 'enzyme';
import { ConceptList } from './index';
import conceptItems from '../../../../../mock/concepts.json';

test('should render ConceptList', (): void => {
  const wrapper = shallow(
    <ConceptList items={conceptItems} catalogId='986105174' />
  );
  expect(wrapper).toMatchSnapshot();
});
