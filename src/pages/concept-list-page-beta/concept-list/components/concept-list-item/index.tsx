import React, { FC } from 'react';
import { compose } from '@reduxjs/toolkit';
import {
  Link as RouterLink,
  RouteComponentProps,
  withRouter
} from 'react-router-dom';

import { DateTime } from 'luxon';
import { Concept } from '../../../../../types';
import { ConceptStatus } from '../../../../../types/enums';
import { localization } from '../../../../../lib/localization';
import { getTranslateText } from '../../../../../lib/translateText';

import SC from './styled';

interface RouteParams {
  catalogId: string;
}

interface ExternalProps {
  concept: Concept;
}
interface Props extends ExternalProps, RouteComponentProps<RouteParams> {}

const getStatusIcon = (
  status: string | null | undefined,
  erPublisert: boolean = false,
  erSistPublisert: boolean = false
) => {
  if (erPublisert && erSistPublisert) {
    return (
      <>
        <SC.PublishedIcon /> <span>{localization.published}</span>
      </>
    );
  }
  if (status === ConceptStatus.UTKAST) {
    return (
      <>
        <SC.DraftIcon />
        <span>{localization.draft}</span>
      </>
    );
  }
  if (erPublisert && !erSistPublisert) {
    return (
      <>
        <SC.ExPublishedIcon />
        <span>{localization.exPublished}</span>
      </>
    );
  }
  if (status === ConceptStatus.HOERING) {
    return (
      <>
        <SC.HearingIcon />
        <span>{localization.hoering}</span>
      </>
    );
  }
  if (status === ConceptStatus.GODKJENT) {
    return (
      <>
        <SC.ApprovedIcon />
        <span>{localization.approved}</span>
      </>
    );
  }
  return null;
};

const ListItem: FC<Props> = ({
  concept,
  match: {
    params: { catalogId }
  }
}) => {
  if (!concept) {
    return null;
  }

  return (
    <SC.ListItem to={`${catalogId}/${concept.id}`} as={RouterLink}>
      <SC.Column>{getTranslateText(concept.anbefaltTerm?.navn)}</SC.Column>
      <SC.Column>{getTranslateText(concept.tildeltBruker?.id)}</SC.Column>
      <SC.Column>
        {concept.endringslogelement?.endringstidspunkt &&
          DateTime.fromISO(
            concept.endringslogelement?.endringstidspunkt
          ).toLocaleString()}
      </SC.Column>
      <SC.Column>
        {concept?.versjonsnr && (
          <span>
            {concept.versjonsnr?.major}.{concept.versjonsnr?.minor}.
            {concept.versjonsnr?.patch}
          </span>
        )}
      </SC.Column>
      <SC.Column>
        {getStatusIcon(
          concept.status,
          concept.erPublisert,
          concept.erSistPublisert
        )}
      </SC.Column>
    </SC.ListItem>
  );
};

export default compose<FC<ExternalProps>>(withRouter)(ListItem);
