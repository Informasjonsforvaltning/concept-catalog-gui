import styled, { css } from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';
import ButtonBase from '@fellesdatakatalog/button';

import IconBase from '../../images/icon-checked-white-sm.svg';

interface Props {
  $selected: boolean;
}
const Button = styled(ButtonBase)<Props>`
  ${({ $selected }) =>
    !$selected &&
    css`
      background-color: ${theme.colour(Colour.GREEN, 'G30')};
      color: ${theme.colour(Colour.GREEN, 'G60')};
    `}
  &:hover {
    ${({ $selected }) =>
      !$selected &&
      css`
        color: ${theme.colour(Colour.NEUTRAL, 'N0')};
      `}
  }
`;

const Icon = styled(IconBase)`
  height: 18px;
`;

export default { Button, Icon };
