import React, { memo, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Variant } from '@fellesdatakatalog/button';

import { ConceptStatus, TimeFormat } from '../../types/enums';
import { formatTime } from '../../utils/date';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { localization } from '../../lib/localization';
import { patchConceptFromForm } from '../../lib/patchConceptForm';
import { publishConceptFromForm } from '../../lib/publishConceptFromForm';
import { deleteConcept } from '../../api/concept-catalog-api';
import ConfirmDialog from '../confirm-dialog';

import SC from './styled';

interface Props<V> {
  isFormDirty: boolean;
  createNewConceptRevisionAndNavigate: () => void;
  isInitialInValidForm: boolean;
  lastPatchedResponse: any;
  values: V;
}

const FormControl = <V,>({
  isFormDirty,
  createNewConceptRevisionAndNavigate,
  isInitialInValidForm,
  lastPatchedResponse,
  values
}: Props<V>) => {
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

  const { catalogId, conceptId } = useParams<{
    catalogId: string;
    conceptId: string;
  }>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const conceptForm = useAppSelector(state => state.conceptForm);
  const { concept } = conceptForm;
  const erSistPublisert = concept?.erSistPublisert ?? false;
  const published = concept?.erPublisert ?? false;
  const validationError = conceptForm.isValidationError || isInitialInValidForm;
  const isSaving = conceptForm.isSaving ?? false;
  const justChangedStatus = conceptForm.justChangedStatus ?? false;

  const endringstidspunkt = concept?.endringslogelement?.endringstidspunkt;

  const createMessage = () => {
    if (justChangedStatus) {
      if (published) {
        return localization.conceptPublished;
      }
      if (concept?.status === ConceptStatus.HOERING) {
        return localization.conceptHoering;
      }
      if (concept?.status === ConceptStatus.GODKJENT) {
        return localization.conceptApproval;
      }
    }
    if (isSaving) {
      return `${localization.isSaving}...`;
    }
    if (published) {
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

  return concept ? (
    <>
      <SC.FormControl $isSticky={isSticky}>
        <SC.FormControlContent>
          {isFormDirty && published && erSistPublisert && (
            <SC.Button onClick={createNewConceptRevisionAndNavigate}>
              <SC.StatusDraftIcon />
              {localization.saveDraft}
            </SC.Button>
          )}
          {!published && (
            <SC.Button
              disabled={isSaving || !isFormDirty}
              onClick={() => {
                patchConceptFromForm(values, {
                  concept,
                  dispatch,
                  lastPatchedResponse,
                  isSaving
                });
                setTimeout(() => history.go(0), 1000);
              }}
            >
              {localization.save}
            </SC.Button>
          )}
          {!published && (
            <SC.StatusButton
              $active={concept?.status === ConceptStatus.HOERING}
              disabled={
                validationError ||
                (!!concept.revisjonAv && !concept.revisjonAvSistPublisert) ||
                isFormDirty
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
                  {
                    concept,
                    dispatch,
                    lastPatchedResponse: concept,
                    isSaving
                  }
                )
              }
            >
              <SC.StatusHearingIcon />
              {localization.setToHoering}
            </SC.StatusButton>
          )}
          {!published && (
            <SC.StatusButton
              $active={concept?.status === ConceptStatus.GODKJENT}
              disabled={
                validationError ||
                (!!concept.revisjonAv && !concept.revisjonAvSistPublisert) ||
                isFormDirty
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
                  {
                    concept,
                    dispatch,
                    lastPatchedResponse: concept,
                    isSaving
                  }
                )
              }
            >
              <SC.StatusApprovedIcon />
              {localization.setToApproval}
            </SC.StatusButton>
          )}
          {!published && (
            <SC.StatusButton
              disabled={
                validationError ||
                (!!concept.revisjonAv && !concept.revisjonAvSistPublisert) ||
                isFormDirty
              }
              onClick={() =>
                publishConceptFromForm({
                  concept,
                  dispatch,
                  lastPatchedResponse: concept,
                  isSaving
                })
              }
            >
              <SC.StatusPublishedIcon />
              {localization.publish}
            </SC.StatusButton>
          )}
          <div>
            <span>{createMessage()}</span>
          </div>

          {!published && (
            <SC.DeleteButton
              variant={Variant.TERTIARY}
              disabled={isSaving}
              onClick={toggleShowConfirmDelete}
            >
              <SC.RemoveIcon />
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
  ) : null;
};

export default memo(FormControl) as typeof FormControl;
