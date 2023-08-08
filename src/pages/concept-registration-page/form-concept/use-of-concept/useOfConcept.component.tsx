import React from 'react';
import { Field } from 'formik';
import { InputField } from '../../../../components/fields/field-input/field-input.component';
import { TextAreaField } from '../../../../components/fields/field-textarea/field-textarea.component';
import { HelpText } from '../../../../components/help-text/help-text.component';
import { localization } from '../../../../lib/localization';
import { MultilingualField } from '../../../../components/multilingual-field/multilingual-field.component';
import { Language } from '../../../../types';
import {InputTagsField} from "../../../../components/fields/field-input-tags/field-input-tags.component";

interface Props {
  languages: Language[];
}

export const UseOfTerm = ({ languages }: Props): JSX.Element => (
  <div>
    <div className='form-group'>
      <HelpText
        title={localization.eksempelTitle}
        helpTextAbstract={localization.eksempelAbstract}
        helpTextDescription={localization.eksempelDescription}
      />
      <MultilingualField
        name='eksempel'
        component={TextAreaField}
        label='eksempel'
        languages={languages}
      />
    </div>
    <div className='form-group'>
      <HelpText
        title={localization.fagomraadeTitle}
        helpTextAbstract={localization.fagomraadeAbstract}
        helpTextDescription={localization.fagomraadeDescription}
      />
      <MultilingualField
        name='fagområde'
        component={InputTagsField}
        label='fagområde'
        languages={languages}
      />
    </div>
    <div className='form-group'>
      <HelpText
        title={localization.omfangTitle}
        helpTextAbstract={localization.omfangAbstract}
        helpTextDescription={localization.omfangDescription}
      />
      <div className='d-flex'>
        <div className='w-50'>
          <Field
            name='omfang.tekst'
            component={InputField}
            label={localization.titleScope}
            showLabel
          />
        </div>
        <div className='w-50'>
          <Field
            name='omfang.uri'
            component={InputField}
            label={localization.linkScope}
            showLabel
          />
        </div>
      </div>
    </div>
  </div>
);
