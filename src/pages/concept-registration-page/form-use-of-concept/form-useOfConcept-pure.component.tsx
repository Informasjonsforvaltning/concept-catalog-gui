import React from 'react';
import { Field } from 'formik';
import { InputField } from '../../../components/field-input/field-input.component';
import { InputTagsField } from '../../../components/field-input-tags/field-input-tags.component';
import { TextAreaField } from '../../../components/field-textarea/field-textarea.component';
import { HelpText } from '../../../components/help-text/help-text.component';
import { localization } from '../../../lib/localization';

export const FormUseOfTermPure = (): JSX.Element => (
  <div>
    <div className="form-group">
      <HelpText
        title={localization.eksempelTitle}
        required={false}
        helpTextAbstract={localization.eksempelAbstract}
        helpTextDescription={localization.eksempelDescription}
      />
      <Field name="eksempel" component={TextAreaField} />
    </div>
    <div className="form-group">
      <HelpText
        title={localization.fagomraadeTitle}
        required={false}
        helpTextAbstract={localization.fagomraadeAbstract}
        helpTextDescription={localization.fagomraadeDescription}
      />
      <Field name="fagområde" component={InputField} />
    </div>
    <div className="form-group">
      <HelpText
        title={localization.bruksomraadeTitle}
        required={false}
        helpTextAbstract={localization.bruksomraadeAbstract}
        helpTextDescription={localization.bruksomraadeDescription}
      />
      <Field name="bruksområde" component={InputTagsField} />
    </div>
    <div className="form-group">
      <HelpText
        title={localization.omfangTitle}
        required={false}
        helpTextAbstract={localization.omfangAbstract}
        helpTextDescription={localization.omfangDescription}
      />
      <div className="d-flex">
        <div className="w-50">
          <Field name="omfang.tekst" component={InputField} label={localization.titleScope} showLabel={true} />
        </div>
        <div className="w-50">
          <Field name="omfang.uri" component={InputField} label={localization.linkScope} showLabel={true} />
        </div>
      </div>
    </div>
  </div>
);
