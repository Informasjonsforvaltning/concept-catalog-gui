import React from 'react';

interface Props {
  title: string;
}

export const ConceptTitle = ({ title }: Props): JSX.Element | null => {
  return (
    <div>
      <h1>{title} sine begrepsbeskrivelser</h1>
      <p>{title}</p>
    </div>
  );
};
