import styled from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';

interface Props {
  $checked: boolean;
}

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<Props>`
  display: inline-flex;
  width: 20px;
  height: 20px;
  background: ${({ $checked }) =>
    $checked
      ? theme.colour(Colour.NEUTRAL, 'N70')
      : theme.colour(Colour.NEUTRAL, 'N0')};
  border: 1px solid;
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${({ $checked }) => ($checked ? 'visible' : 'hidden')};
  }
`;

export default { CheckboxContainer, Icon, HiddenCheckbox, StyledCheckbox };
