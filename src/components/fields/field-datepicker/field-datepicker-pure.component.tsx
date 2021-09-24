import React, { FC } from 'react';
import { FieldProps } from 'formik';
import DatePicker from 'react-datepicker';
import { DateTime } from 'luxon';
import { Can } from '../../../casl/Can';
import './field-datepicker.scss';
import { localization } from '../../../lib/localization';

interface Props extends FieldProps {
  showLabel: boolean;
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
  label,
  catalogId,
  minDate,
  maxDate
}) => (
  <div className='px-3'>
    <div className='d-flex align-items-center'>
      <Can I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
        <label
          className='fdk-form-label fdk-text-strong position-relative'
          htmlFor={name}
        >
          {showLabel ? label : null}
          {value && value !== 'Invalid date' && (
            <DatePicker
              id={name}
              className='form-control fdk-datepicker'
              dateFormat='dd.MM.yyyy'
              showYearDropdown
              yearDropdownItemNumber={5}
              selected={new Date(value)}
              onChange={date => {
                setFieldValue(
                  name,
                  date instanceof Date
                    ? DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')
                    : null
                );
              }}
              minDate={minDate ? new Date(minDate) : null}
              maxDate={maxDate ? new Date(maxDate) : null}
            />
          )}
          {(!value || (value && value === 'Invalid date')) && (
            <DatePicker
              id={name}
              className='form-control fdk-datepicker'
              dateFormat='dd.MM.yyyy'
              showYearDropdown
              yearDropdownItemNumber={5}
              onChange={date => {
                setFieldValue(
                  name,
                  date instanceof Date
                    ? DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')
                    : null
                );
              }}
              minDate={minDate ? new Date(minDate) : null}
              maxDate={maxDate ? new Date(maxDate) : null}
            />
          )}
          <i className='fa fa-calendar fdk-date' />
        </label>
      </Can>

      <Can not I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
        <div className='d-flex align-items-baseline mb-2'>
          {showLabel ? <div className='fdk-text-strong'>{label}</div> : null}
          <span>
            {DateTime.fromISO(value, {
              locale: localization.getLanguage()
            }).toFormat('DDDD')}
          </span>
        </div>
      </Can>
    </div>
  </div>
);
