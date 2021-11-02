import React, { FC, memo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Concept } from '../../types';
import { ConceptStatus, TimeFormat } from '../../types/enums';
import { formatTime } from '../../utils/date';
import { useDispatch, useGlobalState } from '../../app/context/stateContext';
import { localization } from '../../lib/localization';
import { patchConceptFromForm } from '../../lib/patchConceptForm';
import { deleteConcept } from '../../api/concept-catalogue-api';
import ConfirmDialog from '../confirm-dialog';

import SC from './styled';

interface Props {
  isFormDirty: boolean;
  status: string;
  erSistPublisert: boolean | undefined | null;
  createNewConceptRevisionAndNavigate: () => void;
  concept: Concept;
  lastPatchedResponse: any;
  isInitialInValidForm: boolean;
}

const FormControl: FC<Props> = ({
  isFormDirty,
  status,
  erSistPublisert = false,
  createNewConceptRevisionAndNavigate,
  concept,
  lastPatchedResponse,
  isInitialInValidForm
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const toggleShowConfirmDelete = (): void =>
    setShowConfirmDelete(!showConfirmDelete);

  const { catalogId, conceptId } =
    useParams<{ catalogId: string; conceptId: string }>();
  const history = useHistory();
  const stateConcept = useGlobalState(conceptId);
  const dispatch = useDispatch();
  const published = concept?.status === ConceptStatus.PUBLISERT ?? false;

  const validationError = stateConcept?.validationError || isInitialInValidForm;
  const isSaving = stateConcept?.isSaving ?? false;
  const justPublishedOrUnPublished =
    stateConcept?.justPublishedOrUnPublished ?? false;
  const endringstidspunkt = stateConcept?.endringstidspunkt;

  const createMessage = () => {
    if (justPublishedOrUnPublished) {
      if (status === ConceptStatus.PUBLISERT) {
        return localization.conceptPublished;
      }
      return localization.conceptUnPublished;
    }
    if (isSaving) {
      return `${localization.isSaving}...`;
    }
    if (published || status === ConceptStatus.PUBLISERT) {
      return `${localization.changesUpdated} ${formatTime(
        endringstidspunkt || concept?.endringslogelement?.endringstidspunkt,
        TimeFormat.dateAndHour
      )}.`;
    }
    return `${localization.savedAsDraft} ${formatTime(
      endringstidspunkt || concept?.endringslogelement?.endringstidspunkt,
      TimeFormat.dateAndHour
    )}.`;
  };

  const deleteConceptAndNavigate = async (): Promise<void> => {
    await deleteConcept(conceptId);
    history.push(`/${catalogId}`);
  };

  return (
    <SC.FormControl>
      {isFormDirty && status === ConceptStatus.PUBLISERT && erSistPublisert && (
        <SC.Button onClick={createNewConceptRevisionAndNavigate}>
          {localization.saveDraft}
        </SC.Button>
      )}
      {!published && (
        <SC.PublishButton
          disabled={
            validationError ||
            (!!concept.revisjonAv && !concept.revisjonAvSistPublisert)
          }
          onClick={() =>
            patchConceptFromForm(
              {
                status: ConceptStatus.PUBLISERT,
                ...(concept.versjonsnr?.major === 0 &&
                  concept.versjonsnr?.minor === 0 &&
                  concept.versjonsnr?.patch === 1 && {
                    versjonsnr: { major: 1, minor: 0, patch: 0 }
                  })
              },
              { concept, dispatch, lastPatchedResponse, isSaving }
            )
          }
        >
          {localization.publish}
        </SC.PublishButton>
      )}
      <div>
        <SC.DraftIcon />
        <span>{createMessage()}</span>
      </div>
      {!published && (
        <SC.DeleteButton disabled={isSaving} onClick={toggleShowConfirmDelete}>
          {localization.deleteDraft}
        </SC.DeleteButton>
      )}
      {showConfirmDelete && (
        <ConfirmDialog
          title={localization.confirmDeleteTitle}
          text={localization.confirmDeleteMessage}
          onConfirm={deleteConceptAndNavigate}
          onCancel={toggleShowConfirmDelete}
        />
      )}
    </SC.FormControl>
  );
};

export default memo(FormControl);
