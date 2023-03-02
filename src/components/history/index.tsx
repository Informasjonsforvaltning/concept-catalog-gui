import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/redux/hooks';
import { getupdateByConceptId, selectAllUpdates } from '../../features/history';
import { Updates } from '../../types';

interface HistoryProps {
  conceptId: string;
  resourceId?: string;
}

const History = ({ conceptId }: HistoryProps) => {
  const dispatch = useAppDispatch();
  const updates = useAppSelector(selectAllUpdates);

  useEffect(() => {
    dispatch(getupdateByConceptId({ conceptId }));
  }, [conceptId]);

  return (
    <div>
      <h2>History</h2>
      <ul>
        {updates.map((update: Updates) => (
          <li key={update.id}>
            <p>{update.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
