import styled from 'styled-components';
import { Collapse as CollapseBase } from 'reactstrap';
import { Colour, theme } from '@fellesdatakatalog/theme';

import ListItemSC from '../concept-list-item/styled';
import DraftIconBase from '../../../../../images/icon-draft-circle-md.svg';
import PublishedIconBase from '../../../../../images/icon-status-published-md.svg';
import ExpandIconBase from '../../../../../images/icon-expand-md.svg';
import CollapseIconBase from '../../../../../images/icon-collapse-md.svg';

const CollapseItem = styled.button`
  background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  border: none;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.25em;
  border-radius: 3px;
  position: relative;
  transition: background-color 150ms ease;
  &:hover {
    background-color: ${theme.colour(Colour.NEUTRAL, 'N10')};
  }
`;

const CollapseItemHeader = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 100%;
  padding: ${theme.spacing('S12')} ${theme.spacing('S16')};
`;

const Column = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 25%;
  max-width: 25%;
`;

const Collapse = styled(CollapseBase)`
  display: flex;
  flex: 1 0 100%;
  flex-direction: column;
  padding: ${theme.spacing('S10')} ${theme.spacing('S12')};

  & > ${ListItemSC.ListItem} {
    background-color: ${theme.colour(Colour.GREEN, 'G15')};
  }
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
    fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
  & > circle {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: ${theme.spacing('S10')};
`;

const ExpandIcon = styled(ExpandIconBase)`
  width: 16px;
  & > path {
    fill: ${theme.colour(Colour.NEUTRAL, 'N70')};
  }
`;

const CollapseIcon = styled(CollapseIconBase)`
  width: 16px;
  & > path {
    fill: ${theme.colour(Colour.NEUTRAL, 'N70')};
  }
`;

export default {
  CollapseItem,
  CollapseItemHeader,
  Column,
  Collapse,
  DraftIcon,
  PublishedIcon,
  ExpandIcon,
  CollapseIcon,
  IconWrapper
};
