import React, { FC } from 'react';
import { Field } from 'formik';
import { get } from 'lodash';
import { localization } from '../../../../lib/localization';
import { InputField } from '../../../../components/fields/field-input/field-input.component';
import { HelpText } from '../../../../components/help-text/help-text.component';

import SC from './styled';
import { useAppSelector } from '../../../../app/redux/hooks';
import { isConceptEditable } from '../../../../lib/concept';

interface Props {
  errors: any;
}

export const InternalInfo: FC<Props> = ({ errors }) => {
  const conceptForm = useAppSelector(state => state.conceptForm);

  return (
    <SC.InternalInfo>
      <SC.InformationHeader>{localization.internalInfo}</SC.InformationHeader>
      <SC.Information>
        <span>{localization.internalSubText}</span>
      </SC.Information>
      {isConceptEditable(conceptForm.concept) && (
        <SC.Information>
          <HelpText
            title={localization.versionTitle}
            helpTextAbstract={localization.versionAbstract}
          />
          <SC.Version>
            <Field
              name='versjonsnr.major'
              component={InputField}
              label={localization.versionNumberMajor}
              showLabel
              hideError
            />
            <Field
              name='versjonsnr.minor'
              component={InputField}
              label={localization.versionNumberMinor}
              showLabel
              hideError
            />
            <Field
              name='versjonsnr.patch'
              component={InputField}
              label={localization.versionNumberPatch}
              showLabel
              hideError
            />
          </SC.Version>
          {[
            'versjonsnr',
            'versjonsnr.major',
            'versjonsnr.minor',
            'versjonsnr.patch'
          ].map(
            version =>
              typeof get(errors, version) === 'string' && (
                <div className='alert alert-danger mt-2'>
                  {get(errors, version)}
                </div>
              )
          )}
        </SC.Information>
      )}
      <SC.AssignUser>
        <HelpText
          title={localization.assignUserTitle}
          helpTextAbstract={localization.assignUserAbstract}
        />
        <Field
          name='tildeltBruker.id'
          component={InputField}
          label={localization.assignToUser}
          placeholder={localization.enterFullName}
          showLabel
        />
      </SC.AssignUser>
    </SC.InternalInfo>
  );
};
