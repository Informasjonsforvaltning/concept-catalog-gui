import React from 'react';
import { shallow } from 'enzyme';
import { SortButtons } from './sort-button.component';

test('should render SortButtons', (): void => {
  const onSortField = jest.fn();
  const defaultProps = {
    field: 'title',
    sortField: 'sortField',
    sortType: 'asc',
    onSortField
  };
  const wrapper = shallow(<SortButtons {...defaultProps} />);
  expect(wrapper).toMatchSnapshot();
});
