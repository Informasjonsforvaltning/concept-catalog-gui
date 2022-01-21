import styled from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';

const Breadcrumbs = styled.div`
  background-color: ${theme.colour(Colour.GREEN, 'G15')};
  border-bottom: 1px solid ${theme.colour(Colour.GREEN, 'G30')};
  color: ${theme.colour(Colour.GREEN, 'G60')};
  display: flex;
  word-break: break-word;
`;

const BreadcrumbsPath = styled.div`
  padding: ${theme.spacing('S12')} 0;
`;

export default { Breadcrumbs, BreadcrumbsPath };
