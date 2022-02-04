import styled, { css } from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';
import Button from '@fellesdatakatalog/button';

import IconAddBase from '../../images/icon-add-cicle-sm.svg';
import IconRemoveBase from '../../images/icon-remove-circle-sm.svg';

const ButtonSource = styled(Button)`
  align-items: center;
  display: flex;
  margin-bottom: ${theme.spacing('S10')};
`;

const IconStyle = css`
  height: 1em;
  width: 1em;
  margin-right: ${theme.spacing('S10')};
`;

const IconAdd = styled(IconAddBase)`
  ${IconStyle}
`;

const IconRemove = styled(IconRemoveBase)`
  ${IconStyle};
  fill: ${theme.colour(Colour.RED, 'R60')};
`;

export default { ButtonSource, IconAdd, IconRemove };
