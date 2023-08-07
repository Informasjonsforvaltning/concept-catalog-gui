import React, { FC, useState } from 'react';
import { DateTime } from 'luxon';

import { Concept } from '../../../../../types';
import { ConceptStatus } from '../../../../../types/enums';
import { getTranslateText } from '../../../../../lib/translateText';
import { localization } from '../../../../../lib/localization';

import ListItem from '../concept-list-item';

import SC from './styled';
import {useAppSelector} from "../../../../../app/redux/hooks";
import {selectUserById} from "../../../../../features/users";

interface Props {
  concepts: Concept[];
}

const CollapseItem: FC<Props> = ({ concepts }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const highestPublishedVersionConcept = concepts.find(
    ({ erSistPublisert }) => erSistPublisert
  );
  const newestChange = concepts.reduce(
    (minDate: number, { endringslogelement }) => {
      const modifiedDate = endringslogelement?.endringstidspunkt
        ? DateTime.fromISO(endringslogelement.endringstidspunkt).toMillis()
        : undefined;
      return Math.max(minDate, modifiedDate ?? Infinity);
    },
    -Infinity
  );

  const assignedUser = useAppSelector(state =>
    selectUserById(state, highestPublishedVersionConcept?.assignedUser ?? '')
  );

  return (
    <SC.CollapseItem type='button' onClick={() => setIsOpen(!isOpen)}>
      <SC.CollapseItemHeader>
        <SC.Column>
          {getTranslateText(highestPublishedVersionConcept?.anbefaltTerm?.navn)}
        </SC.Column>
        <SC.Column>{assignedUser?.name}</SC.Column>
        <SC.Column>
          {newestChange !== -Infinity
            ? DateTime.fromMillis(newestChange).toLocaleString()
            : 'Ingen dato'}
        </SC.Column>
        <SC.Column>
          {highestPublishedVersionConcept?.versjonsnr?.major}.
          {highestPublishedVersionConcept?.versjonsnr?.minor}.
          {highestPublishedVersionConcept?.versjonsnr?.patch}
        </SC.Column>
        <SC.Column>
          {highestPublishedVersionConcept?.status === ConceptStatus.UTKAST ? (
            <SC.DraftIcon />
          ) : (
            <SC.PublishedIcon />
          )}
          {highestPublishedVersionConcept?.erPublisert && (
            <span>{localization.published}</span>
          )}
          {highestPublishedVersionConcept?.status === ConceptStatus.UTKAST && (
            <span>{localization.draft}</span>
          )}
        </SC.Column>
        <SC.IconWrapper>
          {isOpen ? <SC.CollapseIcon /> : <SC.ExpandIcon />}
        </SC.IconWrapper>
      </SC.CollapseItemHeader>
      <SC.Collapse isOpen={isOpen}>
        {concepts.map((concept, index) => (
          <ListItem key={index} concept={concept} />
        ))}
      </SC.Collapse>
    </SC.CollapseItem>
  );
};

export default CollapseItem;
