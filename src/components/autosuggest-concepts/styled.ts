import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

const AutosuggestConcepts = styled.div`
  align-items: center;
  display: flex;
  padding-left: ${theme.spacing('S6')};
`;

const Content = styled.div`
  flex: 1 1 auto;
`;

const Labels = styled.div`
  align-items: center;
  display: flex;
  font-weight: ${theme.fontWeight('FW500')};
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

export default { AutosuggestConcepts, Content, Labels, Required };
