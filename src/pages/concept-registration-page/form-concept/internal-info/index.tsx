import React, { FC, useEffect } from 'react';
import { Field, useFormikContext } from 'formik';
import { get } from 'lodash';
import { localization } from '../../../../lib/localization';
import { InputField } from '../../../../components/fields/field-input/field-input.component';
import { CheckboxField } from '../../../../components/fields/field-checkbox/field-checkbox-component';
import { CheckboxTreeField } from '../../../../components/fields/field-checkbox-tree/field-checkbox-tree-component';
import { TextAreaField } from '../../../../components/fields/field-textarea/field-textarea.component';
import { HelpText } from '../../../../components/help-text/help-text.component';

import SC from './styled';
import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks';
import { isConceptEditable } from '../../../../lib/concept';
import { fetchCatalogFields } from '../../../../features/catalog-fields';
import { getTranslateText } from '../../../../lib/translateText';
import { CatalogUser, CodeList, InternalField } from '../../../../types';
import {
  OptionProps,
  SelectField
} from '../../../../components/fields/field-select/field-select.component';
import { fetchUsers, selectAllUsers } from '../../../../features/users';
import {
  fetchCodeLists,
  selectAllCodeLists
} from '../../../../features/code-lists';
import { TreeNode } from '../../../../components/fields/field-checkbox-tree/field-checkbox-tree-pure.component';

interface Props {
  catalogId: string;
  errors: any;
}

const findParent = (id: number, nodes: TreeNode[]) => {
  const parent = nodes.find(node => node.value === `${id}`);
  if (parent) {
    return parent;
  }

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].children) {
      const result = findParent(id, nodes[i].children);
      if (result) {
        return result;
      }
    }
  }

  return null;
};

const renderInternalField = (
  internalField: InternalField,
  values: any,
  userList: CatalogUser[],
  codeLists: CodeList[]
) => {
  const Help = () => (
    <HelpText
      title={getTranslateText(internalField.label)}
      helpTextAbstract={getTranslateText(internalField.description)}
    />
  );

  const name = `interneFelt.${internalField.id}.value`;

  if (internalField.type === 'text_short') {
    return (
      <>
        <Help />
        <Field
          name={name}
          component={InputField}
          label={getTranslateText(internalField.label)}
          showLabel
        />
      </>
    );
  }

  if (internalField.type === 'text_long') {
    return (
      <>
        <Help />
        <Field
          name={name}
          component={TextAreaField}
          rows={3}
          label={getTranslateText(internalField.label)}
          showLabel
        />
      </>
    );
  }

  if (internalField.type === 'boolean') {
    return (
      <>
        <Help />
        <Field
          name={name}
          component={CheckboxField}
          label={getTranslateText(internalField.label)}
          showLabel
        />
      </>
    );
  }

  if (internalField.type === 'user_list') {
    const usersOptions = userList.map(
      ({ userId, name: userName }) =>
        ({
          value: userId,
          label: userName
        } as OptionProps)
    );

    return (
      <>
        <Help />
        <Field
          name={name}
          component={SelectField}
          placeHolder={localization.selectUser}
          label={getTranslateText(internalField.label)}
          showLabel
          showCustomOption
          options={usersOptions}
          onClear={form => form.setFieldValue(name, '')}
          onChange={(form, f, option) => form.setFieldValue(f, option.value)}
          defaultValue={usersOptions.find(
            ({ value }) => value === values[name]
          )}
        />
      </>
    );
  }

  if (internalField.type === 'code_list') {
    const codeListNodes: TreeNode[] =
      codeLists
        ?.filter(codeList => codeList.id === internalField.codeListId)?.[0]
        ?.codes?.reduce((accumulator, currentValue) => {
          const parent = findParent(currentValue.parentID, accumulator);
          if (parent) {
            parent.children = [
              ...(parent.children ?? []),
              {
                value: `${currentValue.id}`,
                label: currentValue.name.nb
              }
            ];
          } else {
            accumulator.push({
              value: `${currentValue.id}`,
              label: currentValue.name.nb
            });
          }
          return accumulator;
        }, []) ?? [];

    return (
      <>
        <Help />
        <Field
          name={name}
          component={CheckboxTreeField}
          nodes={codeListNodes}
        />
      </>
    );
  }

  return null;
};

export const InternalInfo: FC<Props> = ({ catalogId, errors }) => {
  const dispatch = useAppDispatch();
  const conceptForm = useAppSelector(state => state.conceptForm);
  const { catalogFields } = useAppSelector(state => state.catalogFields);
  const userList = useAppSelector(selectAllUsers);
  const codeLists = useAppSelector(selectAllCodeLists);
  const { values }: any = useFormikContext();

  useEffect(() => {
    dispatch(
      fetchCatalogFields({
        catalogId
      })
    );
    dispatch(
      fetchUsers({
        catalogId
      })
    );
    dispatch(
      fetchCodeLists({
        catalogId
      })
    );
  }, [catalogId]);

  return (
    <SC.InternalInfo>
      <SC.InformationHeader>{localization.internalInfo}</SC.InformationHeader>
      <SC.Information>
        <span>{localization.internalSubText}</span>
      </SC.Information>
      {catalogFields?.internal?.map(field => (
        <SC.Information key={field.id}>
          {renderInternalField(field, values, userList, codeLists)}
        </SC.Information>
      ))}
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
