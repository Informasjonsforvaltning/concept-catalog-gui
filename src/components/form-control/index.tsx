import React, { FC, memo, useEffect, useState } from 'react';
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
  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    currentScrollPos > 198 ? setSticky(true) : setSticky(false);
  };

  function debounce(fn, delay) {
    return function deb() {
      clearTimeout(fn._tId);
      fn._tId = setTimeout(() => {
        fn();
      }, delay);
    };
  }

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 50));
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, [debounce, handleScroll]);

  const toggleShowConfirmDelete = (): void =>
    setShowConfirmDelete(!showConfirmDelete);

  const { catalogId, conceptId } =
    useParams<{ catalogId: string; conceptId: string }>();
  const history = useHistory();
  const stateConcept = useGlobalState(conceptId);
  const dispatch = useDispatch();
  const published = stateConcept?.status === ConceptStatus.PUBLISERT ?? false;

  const validationError = stateConcept?.validationError || isInitialInValidForm;
  const isSaving = stateConcept?.isSaving ?? false;
  const justChangedStatus = stateConcept?.justChangedStatus ?? false;
  const endringstidspunkt = stateConcept?.endringstidspunkt;

  const createMessage = () => {
    if (justChangedStatus) {
      if (status === ConceptStatus.PUBLISERT) {
        return localization.conceptPublished;
      }
      if (stateConcept?.status === ConceptStatus.HOERING) {
        return localization.conceptHoering;
      }
      if (stateConcept?.status === ConceptStatus.GODKJENT) {
        return localization.conceptApproval;
      }
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
    return `${localization.saved} ${formatTime(
      endringstidspunkt || concept?.endringslogelement?.endringstidspunkt,
      TimeFormat.dateAndHour
    )}.`;
  };

  const deleteConceptAndNavigate = async (): Promise<void> => {
    await deleteConcept(conceptId);
    history.push(`/${catalogId}`);
  };

  return (
    <>
      <SC.FormControl $isSticky={isSticky}>
        <SC.FormControlContent>
          {isFormDirty &&
            status === ConceptStatus.PUBLISERT &&
            erSistPublisert && (
              <SC.Button onClick={createNewConceptRevisionAndNavigate}>
                {localization.saveDraft}
              </SC.Button>
            )}
          {!published && (
            <SC.StatusButton
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
            </SC.StatusButton>
          )}
          {!published && (
            <SC.StatusButton
              $active={lastPatchedResponse?.status === ConceptStatus.HOERING}
              disabled={
                validationError ||
                (!!concept.revisjonAv && !concept.revisjonAvSistPublisert)
              }
              onClick={() =>
                patchConceptFromForm(
                  {
                    status: ConceptStatus.HOERING,
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
              {localization.setToHoering}
            </SC.StatusButton>
          )}
          {!published && (
            <SC.StatusButton
              $active={lastPatchedResponse?.status === ConceptStatus.GODKJENT}
              disabled={
                validationError ||
                (!!concept.revisjonAv && !concept.revisjonAvSistPublisert)
              }
              onClick={() =>
                patchConceptFromForm(
                  {
                    status: ConceptStatus.GODKJENT,
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
              {localization.setToApproval}
            </SC.StatusButton>
          )}
          <div>
            <SC.DraftIcon />
            <span>{createMessage()}</span>
          </div>
          {!published && (
            <SC.DeleteButton
              disabled={isSaving}
              onClick={toggleShowConfirmDelete}
            >
              {localization.deleteDraft}
            </SC.DeleteButton>
          )}
        </SC.FormControlContent>
      </SC.FormControl>
      {showConfirmDelete && (
        <ConfirmDialog
          title={localization.confirmDeleteTitle}
          text={localization.confirmDeleteMessage}
          onConfirm={deleteConceptAndNavigate}
          onCancel={toggleShowConfirmDelete}
        />
      )}
    </>
  );
};

export default memo(FormControl);
