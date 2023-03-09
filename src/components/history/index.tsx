import React from 'react';
import { Table } from 'reactstrap';
import { Updates } from '../../types';
import {
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  HistoryTitle
} from './styled';

interface HistoryProps {
  conceptId: string;
  resourceId?: string;
}

// eslint-disable-next-line no-empty-pattern
const History = ({}: HistoryProps) => {
  const updates: Updates[] = [
    {
      conceptId: '1',
      resourceId: '1',
      id: '1',
      person: 'John Doe',
      datetime: '2022-02-26T10:00:00Z',
      operations: 'Added a new concept'
    },
    {
      conceptId: '2',
      resourceId: '2',
      id: '2',
      person: 'Jane Smith',
      datetime: '2022-02-25T11:00:00Z',
      operations: 'Updated related terms of the concept'
    },
    {
      conceptId: '3',
      resourceId: '3',
      id: '3',
      person: 'Bob Johnson',
      datetime: '2022-02-24T12:00:00Z',
      operations: 'Added a new attribute to the concept'
    }
  ];

  return (
    <div>
      <Table>
        <TableHeader>
          <HistoryTitle>Endringslogg</HistoryTitle>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Oppdatert av</TableHeaderCell>
            <TableHeaderCell>Dato oppdatert</TableHeaderCell>
            <TableHeaderCell>Operasjon</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {updates.map(update => (
            <TableRow key={update.id}>
              <TableCell>{update.id}</TableCell>
              <TableCell>{update.person}</TableCell>
              <TableCell>{update.datetime}</TableCell>
              <TableCell>{update.operations}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default History;
