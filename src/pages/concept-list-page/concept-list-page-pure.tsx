import React, { useState, useEffect } from 'react';
import Link from '@fellesdatakatalog/link';

import { getTranslateText } from '../../lib/translateText';
import { ConceptList } from './concept-list/concept-list.component';
import { ConceptTitle } from './concept-title/concept-title.component';
import { AddConceptButton } from '../../components/add-concept-button/add-concept-button.component';
import { postConcept, getConceptsForCatalog } from '../../api/concept-catalogue-api';

import { Can } from '../../casl/Can';
import { ImportConceptButton } from '../../components/import-concept-button/import-concept-button.component';
import { mapConcepts } from '../../app/reducers/conceptMapper';
import { Concept } from '../../domain/Concept';

import SearchBar from '../../components/search-bar';

interface Props {
  history: any;
  publisher: Record<string, any>;
  catalogId: string;
}

interface Navn {
  nb?: any;
  nn?: any;
  en?: any;
}

const createConcept = catalogId => ({
  anbefaltTerm: {
    navn: {}
  },
  status: 'utkast',
  ansvarligVirksomhet: {
    id: catalogId
  }
});

const createNewConceptAndNavigate = ({ history, catalogId }) =>
  postConcept(createConcept(catalogId)).then(resourceId => history.push(`/${catalogId}/${resourceId}`));

export const ConceptListPagePure = ({ history, publisher: { prefLabel, name }, catalogId }: Props): JSX.Element => {
  const [fileParsingError, setFileParsingError] = useState('');
  const [conceptImportSuccess, setConceptImportSuccess] = useState('');
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [filteredConcepts, setFilteredConcepts] = useState<Concept[]>([]);
  const [previousQuery, setPreviousQuery] = useState<string>('');

  const multiLangMatch = (query: string, { nb, nn, en }: Navn): boolean => {
    const regex = new RegExp(`\\b${query}\\w*`, 'i');
    return (
      (typeof nb === 'string' && nb.match(regex) != null) ||
      (typeof nn === 'string' && nn.match(regex) != null) ||
      (typeof en === 'string' && en.match(regex) != null)
    );
  };

  const filterConcepts = (query: string) => {
    const isExtension = previousQuery.length > 0 && query.slice(0, -1) === previousQuery;

    setFilteredConcepts(
      (isExtension ? filteredConcepts : concepts).filter(
        ({ anbefaltTerm }) => anbefaltTerm?.navn && multiLangMatch(query, anbefaltTerm.navn)
      )
    );
    setPreviousQuery(query);
  };

  const init = async () => {
    if (catalogId) {
      setConcepts(await getConceptsForCatalog(catalogId));
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="container">
      <div className="row mb-2">
        <ConceptTitle title={getTranslateText(prefLabel) || name} />
      </div>
      <Can I="create a concept" of={{ __type: 'Concept', publisher: catalogId }}>
        <div className="d-flex flex-row justify-content-start align-items-center row">
          <div className="p-2">
            <AddConceptButton parentOnClick={() => createNewConceptAndNavigate({ history, catalogId })} />
          </div>
          <div className="p-2">
            <ImportConceptButton
              onUpload={event =>
                mapConcepts(event, setFileParsingError, setConceptImportSuccess, catalogId, setConcepts)
              }
            />
          </div>
          <div className="p-2">
            <Link
              href="https://informasjonsforvaltning.github.io/felles-datakatalog/begrepskatalog/hvordan_publisere/"
              external
              className="mb-2"
            >
              Retningslinjer for import av begrep
            </Link>
          </div>
        </div>
        {fileParsingError && <div className="row alert alert-danger">Feil ved import av fil. {fileParsingError}</div>}
        {conceptImportSuccess && <div className="row alert alert-success">{conceptImportSuccess}</div>}
      </Can>
      <div className="row mb-4">
        <SearchBar placeholder="Søk etter begrep" onChange={filterConcepts} />
      </div>
      <div className="mb-2">
        <ConceptList items={previousQuery.length > 0 ? filteredConcepts : concepts} catalogId={catalogId} />
      </div>
    </div>
  );
};
