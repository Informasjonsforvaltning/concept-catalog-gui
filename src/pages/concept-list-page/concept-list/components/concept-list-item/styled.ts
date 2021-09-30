import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';
import Link from '@fellesdatakatalog/link';

import DraftIconBase from '../../../../../images/icon-draft-circle-md.svg';
import PublishedIconBase from '../../../../../images/icon-alert-success.svg';

const ListItem = styled(Link)`
  align-items: center;
  background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  color: ${theme.colour(Colour.NEUTRAL, 'N70')};
  display: flex;
  margin-bottom: 0.25em;
  border-radius: 3px;
  padding: ${theme.spacing('S12')} ${theme.spacing('S16')};
  text-decoration: none;
  transition: background-color 150ms ease;
  &:hover {
    background-color: ${theme.colour(Colour.NEUTRAL, 'N10')};
  }
`;

const Column = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 20%;
  max-width: 20%;
`;

const DraftIcon = styled(DraftIconBase)`
  width: 30px;
  height: 30px;
  margin-right: ${theme.spacing('S4')};

  & > path {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
  & > circle {
    fill: ${theme.colour(Colour.GREEN, 'G15')};
  }
`;

const PublishedIcon = styled(PublishedIconBase)`
  width: 30px;
  height: 30px;
  margin-right: ${theme.spacing('S4')};

  & > path {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

export default { ListItem, Column, DraftIcon, PublishedIcon };
