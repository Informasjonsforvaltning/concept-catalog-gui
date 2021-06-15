import React, { FC } from 'react';

import SC from './styled';

interface Props {
  placeholder: string;
  onChange: (value: string) => void;
}

const SearchBar: FC<Props> = ({ placeholder, onChange }) => (
  <SC.SearchContainer>
    <SC.SearchField placeholder={placeholder} onChange={({ currentTarget }) => onChange(currentTarget.value ?? '')} />
    <SC.SearchIcon />
  </SC.SearchContainer>
);

export default SearchBar;
