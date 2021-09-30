import React, { FC } from 'react';
import { compose } from 'redux';
import {
  Link as RouterLink,
  RouteComponentProps,
  withRouter
} from 'react-router-dom';
import cx from 'classnames';

import { Concept } from '../../../../../types';
import { localization } from '../../../../../lib/localization';
import { getTranslateText } from '../../../../../lib/translateText';

import { determineValidity } from '../../utils/determine-validity';
import SC from './styled';

interface RouteParams {
  catalogId: string;
}

interface ExternalProps {
  concept: Concept;
}
interface Props extends ExternalProps, RouteComponentProps<RouteParams> {}

const ListItem: FC<Props> = ({
  concept,
  match: {
    params: { catalogId }
  }
}) => {
  if (!concept) {
    return null;
  }

  const statusClass = cx('fa', 'fa-circle', 'mr-2', 'd-none', 'd-sm-inline', {
    'fdk-color-primary': status === 'publisert',
    'fdk-color-neutral-dark': status === 'utkast'
  });

  return (
    <SC.ListItem to={`${catalogId}/${concept.id}`} as={RouterLink}>
      <SC.Column>{getTranslateText(concept.anbefaltTerm?.navn)}</SC.Column>
      <SC.Column>{getTranslateText(concept.fagområde)}</SC.Column>
      <SC.Column>
        {determineValidity(concept.gyldigFom, concept.gyldigTom)}
      </SC.Column>
      <SC.Column>
        {concept.versjonsnr.major}.{concept.versjonsnr.minor}.
        {concept.versjonsnr.patch}
      </SC.Column>
      <SC.Column>
        <i className={statusClass} />
        {concept.status === 'publisert' && (
          <span>{localization.published}</span>
        )}
        {concept.status === 'utkast' && <span>{localization.draft}</span>}
      </SC.Column>
    </SC.ListItem>
  );
};

export default compose<FC<ExternalProps>>(withRouter)(ListItem);