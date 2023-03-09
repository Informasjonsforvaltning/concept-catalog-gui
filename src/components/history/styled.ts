import { Colour, theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

export const Table = styled.table`
  background-color: ${theme.colour(Colour.GREEN, 'G30')};
  border-collapse: collapse;
  border-radius: 5px;
  border: 1px solid ${theme.colour(Colour.NEUTRAL, 'N60')};
  margin-bottom: ${theme.spacing('S48')};
  width: 100%;
`;

export const TableHeader = styled.thead`
  background-color: ${theme.colour(Colour.GREEN, 'G60')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  font-size: ${theme.fontSize('FS20')};
  font-weight: ${theme.fontWeight('FW700')};
  padding: ${theme.spacing('S16')} ${theme.spacing('S24')};
  text-align: left;
  text-transform: uppercase;
`;

export const TableHeaderCell = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.td`
  border: 1px solid ${theme.colour(Colour.NEUTRAL, 'N60')};
  font-size: ${theme.fontSize('FS20')};
  padding: ${theme.spacing('S16')} ${theme.spacing('S24')};
`;
