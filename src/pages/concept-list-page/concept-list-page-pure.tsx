import React, { useState, useEffect } from 'react';
import Link from '@fellesdatakatalog/link';

import { getTranslateText } from '../../lib/translateText';
import { ConceptList } from './concept-list/components/concept-list';
import { ConceptTitle } from './concept-title/concept-title.component';
import {
  postConcept,
  getConceptsForCatalog,
  searchConceptsForCatalog
} from '../../api/concept-catalog-api';

import { Can } from '../../casl/Can';
import { ImportConceptButton } from '../../components/import-concept-button/import-concept-button.component';
import { mapConcepts } from '../../app/reducers/conceptMapper';
import { Concept, ImportErrorMessage } from '../../types';

import Root from '../../components/root';
import SearchBar from '../../components/search-bar';
import ErrorRow from '../../components/error-row';

import SC from './styled';
import { localization } from '../../lib/localization';

interface Props {
  history: any;
  publisher: Record<string, any>;
  catalogId: string;
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
  postConcept(createConcept(catalogId)).then(resourceId =>
    history.push(`/${catalogId}/${resourceId}`)
  );

export const ConceptListPagePure = ({
  history,
  publisher: { prefLabel, name },
  catalogId
}: Props): JSX.Element => {
  const [fileParsingError, setFileParsingError] = useState<ImportErrorMessage>({
    thrown: false
  });
  const [conceptImportSuccess, setConceptImportSuccess] = useState('');
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchConcepts = async (query: string) => {
    if (catalogId) {
      setSearchQuery(query);
      setConcepts(await searchConceptsForCatalog(catalogId, { query }));
    }
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
    <Root>
      <SC.Container>
        <div className='row mb-2'>
          <ConceptTitle title={getTranslateText(prefLabel) || name} />
        </div>
        <Can
          I='create a concept'
          of={{ __type: 'Concept', publisher: catalogId }}
        >
          <div className='d-flex flex-row  justify-content-start align-items-center row mb-4'>
            <div>
              <SC.AddConceptButton
                onClick={() =>
                  createNewConceptAndNavigate({ history, catalogId })
                }
              >
                <SC.AddIcon />
                {localization.addNewConcept}
              </SC.AddConceptButton>
              <ImportConceptButton
                onUpload={event =>
                  mapConcepts(
                    event,
                    setFileParsingError,
                    setConceptImportSuccess,
                    catalogId,
                    setConcepts
                  )
                }
              />
            </div>
            <div className='p-2' />
            <div className='p-2'>
              <Link
                href='https://informasjonsforvaltning.github.io/felles-datakatalog/begrepskatalog/hvordan_publisere/'
                external
                className='mb-2'
              >
                Retningslinjer for import av begrep
              </Link>
            </div>
          </div>
          {fileParsingError.thrown && (
            <ErrorRow
              errorTitle='Feil ved import av fil.'
              errorMessage={fileParsingError}
            />
          )}
          {conceptImportSuccess && (
            <div className='row alert alert-success'>
              {conceptImportSuccess}
            </div>
          )}
        </Can>
        <div className='row mb-4'>
          <SearchBar placeholder='Søk etter begrep' onSearch={searchConcepts} />
        </div>
        <div className='row mb-5'>
          <ConceptList items={concepts} highlight={searchQuery} />
        </div>
      </SC.Container>
    </Root>
  );
};
