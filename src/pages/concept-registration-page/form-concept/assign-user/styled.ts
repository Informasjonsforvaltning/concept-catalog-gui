import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

import HelpTextSC from '../../../../components/help-text/styled';

const AssignUser = styled.div`
  background-color: ${theme.colour(Colour.GREEN, 'G30')};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing('S12')};
  padding: ${theme.spacing('S32')};

  & > div > div > label > input {
    border-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    font-size: ${theme.fontSize('FS20')};
    height: 3em;
  }

  ${HelpTextSC.HelpText} {
    background-color: ${theme.colour(Colour.GREEN, 'G40')};
  }
`;

const InformationHeader = styled.div`
  font-size: ${theme.fontSize('FS24')};
  font-weight: 600;
`;

const Information = styled.div`
  margin-bottom: ${theme.spacing('S40')};
`;

export default { AssignUser, InformationHeader, Information };
