import styled from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';

import ErrorIconBase from '../../images/icon-alert-danger-md.svg';
import CollapseIconBase from '../../images/icon-collapse-md.svg';
import ExpandIconBase from '../../images/icon-expand-md.svg';

const FormTemplate = styled.div`
  background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  border-radius: 5px;
  box-shadow: 0 3px 12px rgba(35, 55, 65, 0.55);
  display: flex;
  flex-direction: column;
  margin: ${theme.spacing('S10')} 0;
  padding: ${theme.spacing('S32')};
`;

const CollapseButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  display: flex;
`;

const Title = styled.h2`
  color: ${theme.colour(Colour.GREEN, 'G60')};
  font-size: ${theme.fontSize('FS24')};
  font-weight: ${theme.fontWeight('FW500')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RequiredBadge = styled.div`
  background-color: ${theme.colour(Colour.GREEN, 'G60')};
  border-radius: 20px;
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  margin-left: ${theme.spacing('S6')};
  padding: 2px 6px;
`;

const ErrorIcon = styled(ErrorIconBase)`
  width: 30px;
  margin-left: 10px;
  margin-right: 10px;
`;

const CollapseIcon = styled(CollapseIconBase)`
  width: 20px;
  & > path {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

const ExpandIcon = styled(ExpandIconBase)`
  width: 20px;
  & > path {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

export default {
  FormTemplate,
  CollapseButton,
  Title,
  RequiredBadge,
  ErrorIcon,
  CollapseIcon,
  ExpandIcon
};
