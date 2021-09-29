import React from 'react';
import { shallow } from 'enzyme';
import { SortButtons } from './sort-button.component';
import { SortDirection } from '../../types/enums';

test('should render SortButtons', (): void => {
  const onSortField = jest.fn();
  const defaultProps = {
    field: 'title',
    sortField: 'sortField',
    sortType: SortDirection.ASC,
    onSortField
  };
  const wrapper = shallow(<SortButtons {...defaultProps} />);
  expect(wrapper).toMatchSnapshot();
});
