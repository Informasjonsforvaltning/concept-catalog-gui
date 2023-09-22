import React from 'react';
import { Field, useFormikContext } from 'formik';
import _ from 'lodash';
import { InputField } from '../../../../components/fields/field-input/field-input.component';
import { TextAreaField } from '../../../../components/fields/field-textarea/field-textarea.component';
import { HelpText } from '../../../../components/help-text/help-text.component';
import { localization } from '../../../../lib/localization';
import { MultilingualField } from '../../../../components/multilingual-field/multilingual-field.component';
import { Language, ReferenceDataCode } from '../../../../types';
import { InputTagsField } from '../../../../components/fields/field-input-tags/field-input-tags.component';
import { useAppSelector } from '../../../../app/redux/hooks';
import { selectCodeListById } from '../../../../features/code-lists';
import { selectAllConceptStatuses } from '../../../../features/concept-statuses';
import { convertCodeListToTreeNodes } from '../../../../utils/code-list';
import { CheckboxTreeField } from '../../../../components/fields/field-checkbox-tree/field-checkbox-tree-component';
import { getTranslateText } from '../../../../lib/translateText';
import {
  OptionProps,
  SelectField
} from '../../../../components/fields/field-select/field-select.component';
import { getConfig } from '../../../../config';

interface Props {
  languages: Language[];
}

const config = getConfig();

export const UseOfTerm = ({ languages }: Props): JSX.Element => {
  const { values }: any = useFormikContext();
  const { catalogFields } = useAppSelector(state => state.catalogFields);
  const domainCodeList = useAppSelector(state =>
    selectCodeListById(state, catalogFields?.editable?.domainCodeListId ?? '')
  );

  const capitalizeFirstLetter = str =>
    str && str[0].toUpperCase() + str.slice(1);

  const convertConceptStatusToSelectOptions = (status: ReferenceDataCode) =>
    ({
      value: status.uri,
      label: capitalizeFirstLetter(getTranslateText(status.label))
    } as unknown as OptionProps);

  const statusOptions = useAppSelector(state =>
    selectAllConceptStatuses(state).map(status =>
      convertConceptStatusToSelectOptions(status)
    )
  );
  const handleClearConceptStatus = form => {
    form.setFieldValue(`statusURI`, null);
  };
  const handleChangeConceptStatus = (form, option) => {
    if (option?.value) {
      form.setFieldValue(`statusURI`, option.value);
    }
  };

  const codeListNodes =
    domainCodeList && convertCodeListToTreeNodes(domainCodeList);

  return (
    <div>
      {config.enableConceptCatalogFrontend && (
        <div className='form-group'>
          <HelpText
            title={localization.statusTitle}
            helpTextAbstract={localization.statusAbstract}
          />
          {statusOptions && (
            <Field
              className='col-sm-5'
              name='statusURI'
              component={SelectField}
              options={statusOptions}
              onClear={form => handleClearConceptStatus(form)}
              defaultValue={statusOptions.find(
                option => option.value === values.statusURI
              )}
              onChange={(form, _thisFieldName, option) =>
                handleChangeConceptStatus(form, option)
              }
            />
          )}
        </div>
      )}
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
        {domainCodeList && !_.isEmpty(values.fagområde) && (
          <div className='alert alert-warning'>
            {`${localization.formatString(
              localization.hasPreexistingValue,
              localization.subject,
              getTranslateText(values.fagområde)
            )} ${localization.chooseNewFromList}`}
          </div>
        )}
        {domainCodeList ? (
          <Field
            name='fagområdeKoder.0'
            component={CheckboxTreeField}
            nodes={codeListNodes}
          />
        ) : (
          <MultilingualField
            name='fagområde'
            component={InputTagsField}
            label='fagområde'
            languages={languages}
          />
        )}
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
};
