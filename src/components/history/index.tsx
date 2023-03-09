import React from 'react';
import { Table } from 'reactstrap';
import { Updates } from '../../types';
import {
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell
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
      editedBy: 'John Doe',
      createdDate: '2022-02-26T10:00:00Z',
      updateDescription: 'Updated definition of the concept'
    },
    {
      conceptId: '2',
      resourceId: '2',
      id: '2',
      editedBy: 'Jane Smith',
      createdDate: '2022-02-25T11:00:00Z',
      updateDescription: 'Updated related terms of the concept'
    },
    {
      conceptId: '3',
      resourceId: '3',
      id: '3',
      editedBy: 'Bob Johnson',
      createdDate: '2022-02-24T12:00:00Z',
      updateDescription: 'Added a new attribute to the concept'
    }
  ];
  // const [updates, setUpdates] = useState<Updates[]>([]);
  // const [updates, setUpdates] = useState<Updates[]>(dummyData);

  /*   useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await getUpdateByConceptId(conceptId);
        setUpdates(response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    fetchUpdates();
  }, [conceptId]); */

  return (
    <div>
      <h2>History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Updated By</TableHeaderCell>
            <TableHeaderCell>Updated Date</TableHeaderCell>
            <TableHeaderCell>Update Description</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {updates.map(update => (
            <TableRow key={update.id}>
              <TableCell>{update.id}</TableCell>
              <TableCell>{update.editedBy}</TableCell>
              <TableCell>{update.createdDate}</TableCell>
              <TableCell>{update.updateDescription}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default History;
