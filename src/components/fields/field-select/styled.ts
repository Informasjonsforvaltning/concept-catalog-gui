import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

const SelectField = styled.div`
  align-items: center;
  display: flex;
  padding-left: 0.5rem;
`;

const EditField = styled.label`
  flex: 1;
  font-weight: ${theme.fontWeight('FW500')};
`;

const Labels = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${theme.spacing('S6')};
`;

const Required = styled.div`
  background-color: ${theme.colour(Colour.GREEN, 'G60')};
  border-radius: 20px;
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  font-size: ${theme.fontSize('FS14')};
  font-weight: ${theme.fontWeight('FW400')};
  margin-left: ${theme.spacing('S6')};
  padding: 0 ${theme.spacing('S6')};
`;

const Option = styled.div`
  display: flex;
  font-weight: ${theme.fontWeight('FW400')};

  div:nth-child(1) {
    flex-basis: 30%;
  }

  div:nth-child(2) {
    flex-basis: 35%;
  }

  div:nth-child(3) {
    flex-basis: 35%;
    justify-content: flex-end;
  }
`;

const OptionLabel = styled.div`
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-wrap: wrap;
  padding: ${theme.spacing('S10')};
  word-break: break-word;
`;

const ReadOnlyLabel = styled.div`
  font-weight: ${theme.fontWeight('FW500')};
`;

export default {
  SelectField,
  EditField,
  Labels,
  Required,
  Option,
  OptionLabel,
  ReadOnlyLabel
};
