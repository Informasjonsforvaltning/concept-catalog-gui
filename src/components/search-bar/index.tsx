import React, { useState } from 'react';
import type { FC } from 'react';

import SC from './styled';

interface Props {
  placeholder: string;
  onSearch: (value: string) => void;
}

const SearchBar: FC<Props> = ({ placeholder, onSearch }) => {
  const [value, setValue] = useState<string>('');

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch(value);
    }
  };

  return (
    <SC.SearchContainer>
      <SC.SearchField
        placeholder={placeholder}
        onChange={({ currentTarget }) => setValue(currentTarget.value ?? '')}
        onKeyDown={handleKeyDown}
      />
      <SC.SearchButton
        type='button'
        onClick={() => {
          onSearch(value);
        }}
      >
        <SC.SearchIcon />
      </SC.SearchButton>
    </SC.SearchContainer>
  );
};

export default SearchBar;
