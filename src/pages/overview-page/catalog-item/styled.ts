import styled from 'styled-components';
import Link from '@fellesdatakatalog/link';
import { Colour, theme } from '@fellesdatakatalog/theme';

import ConceptSVG from '../../../images/icon-catalog-concept-lg.svg';

const CatalogLink = styled(Link)`
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  text-decoration: none;
`;

const CatalogItemBody = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  border-radius: 5px;
  padding: ${theme.spacing('S16')};
  word-wrap: break-word;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  &:focus,
  &:active {
    box-shadow: none;
    transform: none;
  }
`;

const CatalogItemCount = styled.span`
  color: ${theme.colour(Colour.NEUTRAL, 'N50')};
  font-size: ${theme.fontSize('FS14')};
  line-height: ${theme.spacing('S16')};
`;

const ConceptIcon = styled(ConceptSVG)`
  height: 40px;
  width: 40px;
  min-height: 40px;
  min-width: 40px;
`;

const Title = styled.h3`
  margin-top: ${theme.spacing('S10')};
  margin-bottom: ${theme.spacing('S4')};
  font-size: ${theme.fontSize('FS20')};
  font-weight: ${theme.fontWeight('FW700')};
`;

export default {
  CatalogLink,
  CatalogItemBody,
  CatalogItemCount,
  ConceptIcon,
  Title
};
