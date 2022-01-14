import React, { FC } from 'react';
import { FieldProps } from 'formik';
import DatePicker from 'react-datepicker';
import { DateTime } from 'luxon';

import { useAppSelector } from '../../../app/redux/hooks';
import { isConceptEditable } from '../../../lib/concept';
import { Can } from '../../../casl/Can';
import './field-datepicker.scss';
import { localization } from '../../../lib/localization';

import SC from './styled';

interface Props extends FieldProps {
  showLabel: boolean;
  showRequired: boolean;
  label: string;
  type: string;
  language: string;
  catalogId: string;
  minDate?: string;
  maxDate?: string;
}

export const DatePickerFieldPure: FC<Props> = ({
  field: { name, value },
  form: { setFieldValue },
  showLabel,
  showRequired,
  label,
  catalogId,
  minDate,
  maxDate
}) => {
  const conceptForm = useAppSelector(state => state.conceptForm);

  const parseDateAndSetValue = (dateValue?: string) => {
    const parsedDate = DateTime.fromFormat(dateValue ?? '', 'dd.MM.yyyy');

    if (!dateValue) {
      setFieldValue(name, null);
    }

    if (parsedDate.isValid) {
      setFieldValue(name, parsedDate.toFormat('yyyy-MM-dd'));
    }
  };

  const renderReadOnlyField = () => (
    <div className='d-flex align-items-baseline mb-2'>
      {showLabel ? <div className='fdk-text-strong'>{label}</div> : null}
      <span>
        {value
          ? DateTime.fromISO(value, {
              locale: localization.getLanguage()
            }).toFormat('DDDD')
          : ''}
      </span>
    </div>
  );

  const renderEditField = () => (
    <label
      className='fdk-form-label fdk-text-strong position-relative'
      htmlFor={name}
    >
      {showLabel && (
        <SC.Labels>
          {label}
          {showRequired && <SC.Required>{localization.required}</SC.Required>}
        </SC.Labels>
      )}
      <DatePicker
        id={name}
        className='form-control fdk-datepicker'
        dateFormat='dd.MM.yyyy'
        showYearDropdown
        yearDropdownItemNumber={5}
        selected={value ? new Date(value) : null}
        onSelect={date =>
          setFieldValue(name, DateTime.fromJSDate(date).toFormat('yyyy-MM-dd'))
        }
        onChangeRaw={event => parseDateAndSetValue(event.target.value)}
        onChange={date => date}
        minDate={minDate ? new Date(minDate) : null}
        maxDate={maxDate ? new Date(maxDate) : null}
        placeholderText='dd.mm.åååå'
      />

      <i className='fa fa-calendar fdk-date' />
    </label>
  );

  return (
    <div className='px-3'>
      <div className='d-flex align-items-center'>
        <Can I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
          {isConceptEditable(conceptForm?.concept)
            ? renderEditField()
            : renderReadOnlyField()}
        </Can>

        <Can not I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
          {renderReadOnlyField()}
        </Can>
      </div>
    </div>
  );
};
