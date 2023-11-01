import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';
import HelpTextSC from '../../../../components/help-text/styled';

const InternalInfo = styled.div`
  background-color: ${theme.colour(Colour.GREEN, 'G30')};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing('S12')};
  margin-bottom: ${theme.spacing('S24')};
  padding: ${theme.spacing('S32')};

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

const Version = styled.div`
  display: flex;

  & > div > div > label > input {
    border-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    font-size: ${theme.fontSize('FS20')};
    height: 3em;
    width: 5em;
  }
`;

const AssignUser = styled.div`
  margin-bottom: ${theme.spacing('S40')};

  & > div > div > label > input {
    border-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    font-size: ${theme.fontSize('FS20')};
    height: 3em;
  }
  & :nth-child(2) {
    & label > div:nth-child(2) {
      width: 50%;
    }
  }
`;

const Error = styled.div`
  border: 1px solid red;
`;

export default {
  InternalInfo,
  InformationHeader,
  Information,
  AssignUser,
  Version,
  Error
};
