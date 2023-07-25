import React, { FC } from 'react';
import { get } from 'lodash';

import CheckboxTree, { Node } from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import { Can } from '../../../casl/Can';
import { isConceptEditable } from '../../../lib/concept';
import { useAppSelector } from '../../../app/redux/hooks';
import './field-checkbox-tree.scss';

export type TreeNode = {
  value: string;
  label: string;
  children: TreeNode[];
};

interface Props {
  field: {
    name: string;
  };
  form: any;
  showLabel: boolean;
  label: string;
  language: string;
  isOnlyOneSelectedLanguage: boolean;
  catalogId: string;
  nodes?: TreeNode[];
}

const mapToNode = (node: TreeNode): Node => ({
  ...node,
  children: node.children?.map(mapToNode),
  className: 'fdk-checkbox-tree-node'
});

export const CheckboxTreeFieldPure: FC<Props> = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, dirty, isValid, status, etc.
  showLabel,
  label,
  language,
  isOnlyOneSelectedLanguage,
  catalogId,
  nodes
}) => {
  const conceptForm = useAppSelector(state => state.conceptForm);
  const checkedValue = get(field, 'value');
  const [checked, setChecked] = React.useState<string[]>(
    checkedValue ? [checkedValue] : []
  );
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const renderReadOnlyField = () => <div />;

  const handleOnCheck = (checkedValues: string[]) => {
    const newCheckedValues = checkedValues.filter(c => !checked.includes(c));
    if (newCheckedValues.length === 1) {
      setChecked(newCheckedValues);
      form.setFieldValue(field.name, newCheckedValues[0]);
      form.setFieldTouched(field.name, true);
    }
  };

  const renderEditField = () => (
    <label
      className='fdk-form-label w-100 fdk-text-strong position-relative'
      htmlFor={field.name}
    >
      {showLabel ? label : null}
      {!!language && !isOnlyOneSelectedLanguage && (
        <span className='language-indicator'>{language}</span>
      )}
      <CheckboxTree
        nodes={nodes?.map(mapToNode) ?? []}
        checked={checked}
        expanded={expanded}
        onCheck={handleOnCheck}
        onExpand={exp => setExpanded(exp)}
        noCascade
        icons={{
          parentClose: null,
          parentOpen: null,
          leaf: null
        }}
      />
    </label>
  );

  return (
    <div className='px-3'>
      <div className='d-flex align-items-center'>
        <Can I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
          {isConceptEditable(conceptForm.concept)
            ? renderEditField()
            : renderReadOnlyField()}
        </Can>
        <Can not I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
          {renderReadOnlyField()}
        </Can>
      </div>
      {get(form.errors, field.name) && (
        <div className='alert alert-danger mt-2'>
          {get(form.errors, field.name)}
        </div>
      )}
    </div>
  );
};
