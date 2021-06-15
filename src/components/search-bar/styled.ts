import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

import SearchSVG from '../../images/icon-search-md.svg';

const SearchContainer = styled.div`
  flex: 0 0 50%;
  background-color: ${theme.colour(Colour.NEUTRAL, 'N10')};
  display: flex;
  border: 1px solid ${theme.colour(Colour.NEUTRAL, 'N70')};
  border-radius: 5px;
  align-items: center;
`;

const SearchField = styled.input`
  border: none;
  background-color: transparent;
  display: flex;
  flex: 1 1;
  padding: ${theme.spacing('S10')};

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(SearchSVG)`
  width: ${theme.fontSize('FS24')};
  height: ${theme.fontSize('FS24')};
  margin: ${theme.spacing('S10')};
`;

export default { SearchContainer, SearchField, SearchIcon };
