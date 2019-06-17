import React, { FunctionComponent } from 'react';
import _ from 'lodash';
import { ConceptList } from './concept-list/concept-list.component';

interface Props {
  concepts: object;
}

export const ConceptListPagePure = ({ concepts }: Props): JSX.Element => {
  return (
    <div className="container">
      <div className="mb-2">
        <ConceptList items={_.get(concepts, 'concepts')} />
      </div>
    </div>
  );
};
