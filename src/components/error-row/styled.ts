import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

import AlertIcon from '../../images/icon-alert-danger-md.svg';
import ExpandTextIcon from '../../images/icon-expand-text-sm.svg';
import CollapseTextIcon from '../../images/icon-collapse-text-sm.svg';

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 0em;
  color: ${theme.colour(Colour.RED, 'R60')};
  background-color: ${theme.colour(Colour.RED, 'R20')};
  border: solid 0.5px ${theme.colour(Colour.RED, 'R60')};
  border-radius: 5px;
`;

const ErrorIcon = styled(AlertIcon)`
  height: 30px;
  width: 30px;
  margin-left: 10px;
  margin-right: 10px;

  & > path {
    fill: ${theme.colour(Colour.RED, 'R60')};
  }
`;

const ExpandButton = styled.button`
  background-color: transparent;
  color: ${theme.colour(Colour.RED, 'R60')};
  text-decoration: underline dotted;
  border: none;

  &:focus {
    outline: none;
  }
`;

const ExpandIcon = styled(ExpandTextIcon)`
  height: 20px;
  width: 20px;

  > path {
    fill: ${theme.colour(Colour.RED, 'R60')};
  }
`;

const CollapseIcon = styled(CollapseTextIcon)`
  height: 20px;
  width: 20px;

  > path {
    fill: ${theme.colour(Colour.RED, 'R60')};
  }
`;

const ExceptionContainer = styled.div`
  margin-top: 1em;
  margin-left: 0.5em;
  margin-right: 0.5em;
  display: flex;
  flex-direction: column;
`;

const ExceptionName = styled.h3`
  font-weight: ${theme.fontWeight('FW700')};
  font-size: ${theme.fontSize('FS12')};
`;

const ExceptionMessage = styled.p`
  font-size: ${theme.fontSize('FS12')};
  margin: 0;
`;

export default {
  ErrorContainer,
  ErrorIcon,
  ExpandButton,
  ExpandIcon,
  CollapseIcon,
  ExceptionContainer,
  ExceptionName,
  ExceptionMessage
};
