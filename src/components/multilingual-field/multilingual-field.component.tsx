import React from 'react';
import { Field } from 'formik';

interface Props {
  name: string;
  label: string;
  component: Function;
  languages: any;
  showLabel?: boolean;
}

export const MultilingualField = ({ name, component, languages, label, showLabel = false }: Props): JSX.Element => (
  <>
    {showLabel && label && (
      <label className="fdk-form-label w-100 pl-2" htmlFor={name}>
        {label}
      </label>
    )}
    {languages.map(({ code, selected }) => {
      const isOnlyOneSelectedLanguage = languages.filter({ selected }).length === 1;

      return (
        selected && (
          <Field
            key={code}
            name={`${name}.${code}`}
            label={`${label}.${code}`}
            component={component}
            language={code}
            isOnlyOneSelectedLanguage={isOnlyOneSelectedLanguage}
          />
        )
      );
    })}
  </>
);
