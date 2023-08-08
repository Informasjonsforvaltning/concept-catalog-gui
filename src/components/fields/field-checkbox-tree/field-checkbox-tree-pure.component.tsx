import React, { FC } from 'react';
import { get } from 'lodash';

import CheckboxTree, { Node } from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Select from 'react-select';

import { Can } from '../../../casl/Can';
import { isConceptEditable } from '../../../lib/concept';
import { useAppSelector } from '../../../app/redux/hooks';
import './field-checkbox-tree.scss';
import { localization } from '../../../lib/localization';

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

const getSearchOptions = (nodes?: TreeNode[]) => {
  let options: any = [];
  if (nodes) {
    nodes.forEach(({ value, label, children }) => {
      options.push({ value, label });
      options = options.concat(getSearchOptions(children));
    });
  }

  return options;
};

const findPath = (treeNode: TreeNode, targetValue: string) => {
  const path: string[] = [];

  const dfs = (tn: TreeNode, v: string) => {
    if (!tn) {
      return false;
    }

    path.push(tn.value);

    if (tn.value === v) {
      return true;
    }

    if (tn.children?.length) {
      for (let index = 0; index < tn.children.length; index++) {
        if (dfs(tn.children[index], v)) {
          return true;
        }
      }
    }

    path.pop();
    return false;
  };

  dfs(treeNode, targetValue);
  return path.slice(); // Return a shallow copy of the path array
};

const getExpanded = (nodes?: TreeNode[], checkedValue?: string) => {
  if (nodes && checkedValue) {
    for (let index = 0; index < nodes.length; index++) {
      const path = findPath(nodes[index], checkedValue);
      if (path.length > 0) {
        return path;
      }
    }
  }

  return [];
};

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
  const [expanded, setExpanded] = React.useState<string[]>(
    getExpanded(nodes, checkedValue)
  );

  const handleSearchOnChange = (option: any) => {
    if (option) {
      setChecked([option.value]);
      setExpanded(getExpanded(nodes, option.value));
    }
  };

  const handleOnCheck = (checkedValues: string[]) => {
    const newCheckedValues = checkedValues.filter(c => !checked.includes(c));
    if (newCheckedValues.length === 1) {
      setChecked(newCheckedValues);
      form.setFieldValue(field.name, newCheckedValues[0]);
      form.setFieldTouched(field.name, true);
    }
  };

  const renderField = (readOnly: boolean) => (
    <label
      className='fdk-form-label w-100 fdk-text-strong position-relative'
      htmlFor={field.name}
    >
      {showLabel ? label : null}
      {!!language && !isOnlyOneSelectedLanguage && (
        <span className='language-indicator'>{language}</span>
      )}
      <Select
        isMulti={false}
        maxMenuHeight={450}
        options={getSearchOptions(nodes)}
        isClearable
        placeholder={localization.searchCode}
        onChange={handleSearchOnChange}
      />
      <CheckboxTree
        nodes={nodes?.map(mapToNode) ?? []}
        checked={checked}
        expanded={expanded}
        disabled={readOnly}
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
            ? renderField(false)
            : renderField(true)}
        </Can>
        <Can not I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
          {renderField(true)}
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
