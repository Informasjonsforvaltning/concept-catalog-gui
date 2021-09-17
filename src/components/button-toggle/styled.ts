import styled from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';
import Button from '@fellesdatakatalog/button';

import IconCollapse from '../../images/icon-collapse-text-sm.svg';
import IconExpand from '../../images/icon-expand-text-sm.svg';

const ButtonToggle = styled(Button)`
  color: ${theme.colour(Colour.GREEN, 'G60')};
`;

const CollapseIcon = styled(IconCollapse)`
  height: 20px;
  & > path {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

const ExpandIcon = styled(IconExpand)`
  height: 20px;
  & > path {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

export default { ButtonToggle, CollapseIcon, ExpandIcon };
