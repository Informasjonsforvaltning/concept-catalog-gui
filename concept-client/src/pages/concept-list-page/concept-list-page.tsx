import React, { FunctionComponent } from 'react';

import { ConceptList } from './concept-list/concept-list.component';

const mockData = [
  {
    title: 'adressenummer',
    theme: 'Økonomi',
    valid: 'Gyldig',
    status: 'DRAFT'
  },
  {
    title: 'ansatt',
    theme: 'HR',
    valid: 'Gyldig',
    status: 'PUBLISH'
  },
  {
    title: 'arkiv',
    theme: 'IKT',
    valid: 'Gyldig',
    status: 'DRAFT'
  }
];

export const ConceptListPage: FunctionComponent = (): JSX.Element => {
  return (
    <div className="container">
      <div className="row mb-2">
        <ConceptList items={mockData} />
      </div>
    </div>
  );
};
