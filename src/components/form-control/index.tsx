import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ConceptStatus, TimeFormat } from '../../types/enums';
import { formatTime } from '../../utils/date';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { localization } from '../../lib/localization';
import {
  patchConceptFromForm,
  postConceptFromForm
} from '../../lib/patchConceptForm';

import SC from './styled';

interface Props<V> {
  isFormDirty: boolean;
  onNewConceptRevision: () => void;
  onSave: (conceptId) => void;
  isInitialInValidForm: boolean;
  lastPatchedResponse: any;
  values: V;
}

const FormControl = <V,>({
  isFormDirty,
  onNewConceptRevision,
  onSave,
  lastPatchedResponse,
  values
}: Props<V>) => {
  const [isSticky, setSticky] = useState(false);
  const [saveCalled, setSaveCalled] = useState(false);
  const [newConceptId, setNewConceptId] = useState(null);

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

  const { conceptId } = useParams<{
    conceptId: string;
  }>();
  const dispatch = useAppDispatch();
  const conceptForm = useAppSelector(state => state.conceptForm);
  const { concept } = conceptForm;
  const published = concept?.erPublisert ?? false;
  const isSaving = conceptForm.isSaving ?? false;
  const justChangedStatus = conceptForm.justChangedStatus ?? false;
  const errorSaving = conceptForm.error ?? false;

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
    if (errorSaving) {
      return `${localization.errorSaving}...`;
    }
    if (published) {
      return `${localization.changesUpdated} ${formatTime(
        endringstidspunkt || concept?.endringslogelement?.endringstidspunkt,
        TimeFormat.dateAndHour
      )}.`;
    }
    return concept?.id
      ? `${localization.saved} ${formatTime(
          endringstidspunkt || concept?.endringslogelement?.endringstidspunkt,
          TimeFormat.dateAndHour
        )}.`
      : '';
  };

  useEffect(() => {
    const id = conceptId === 'new' ? newConceptId : conceptId;
    if (saveCalled && id && !(isSaving || errorSaving)) {
      onSave(id);
    }
  }, [isSaving, errorSaving, saveCalled, newConceptId, onSave]);

  return concept ? (
    <SC.FormControl $isSticky={isSticky}>
      <SC.FormControlContent>
        {isFormDirty && published && (
          <SC.Button onClick={onNewConceptRevision}>
            <SC.StatusDraftIcon />
            {localization.saveDraft}
          </SC.Button>
        )}
        {!published && (
          <SC.Button
            disabled={isSaving || !isFormDirty}
            onClick={() => {
              setSaveCalled(true);
              if (concept?.id) {
                patchConceptFromForm(values, {
                  concept,
                  dispatch,
                  lastPatchedResponse,
                  isSaving
                });
              } else {
                postConceptFromForm(values, {
                  concept,
                  dispatch,
                  isSaving
                })?.then(action => {
                  setNewConceptId(action.payload);
                });
              }
            }}
          >
            {localization.save}
          </SC.Button>
        )}
        <div>
          <span>{createMessage()}</span>
        </div>
      </SC.FormControlContent>
    </SC.FormControl>
  ) : null;
};

export default memo(FormControl) as typeof FormControl;
