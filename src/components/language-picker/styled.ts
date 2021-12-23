import styled from 'styled-components';

import { theme } from '@fellesdatakatalog/theme';

const LanguagePicker = styled.div`
  display: flex;
`;

const Label = styled.label`
  margin-right: ${theme.spacing('S12')};

  & > span {
    margin-left: ${theme.spacing('S6')};
  }
`;

export default { LanguagePicker, Label };
