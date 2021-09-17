import styled from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';

import RootSC from '../root/styled';

const Breadcrumbs = styled(RootSC.Root)`
  border-bottom: 1px solid ${theme.colour(Colour.GREEN, 'G30')};
  color: ${theme.colour(Colour.GREEN, 'G60')};
`;

const BreadcrumbsPath = styled.div`
  padding: ${theme.spacing('S12')} 0;
`;

export default { Breadcrumbs, BreadcrumbsPath };
