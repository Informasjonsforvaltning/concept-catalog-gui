import React, { FC } from 'react';
import { Field, useField } from 'formik';
import { localization } from '../../../../lib/localization';
import { HelpText } from '../../../../components/help-text/help-text.component';
import { DatePickerField } from '../../../../components/fields/field-datepicker/field-datepicker.component';

export const Validity: FC = () => {
  const [gyldigFomField] = useField('gyldigFom');
  const [gyldigTomField] = useField('gyldigTom');
  return (
    <div>
      <div className="form-group">
        <HelpText
          title={localization.gyldigFomTitle}
          helpTextAbstract={localization.gyldigFomAbstract}
          helpTextDescription={localization.gyldigFomDescription}
        />
        <Field name="gyldigFom" component={DatePickerField} label="gyldigFom" maxDate={gyldigTomField.value} />
      </div>
      <div className="form-group">
        <HelpText
          title={localization.gyldigTomTitle}
          helpTextAbstract={localization.gyldigTomAbstract}
          helpTextDescription={localization.gyldigTomDescription}
        />
        <Field name="gyldigTom" component={DatePickerField} label="gyldigTom" minDate={gyldigFomField.value} />
      </div>
    </div>
  );
};
