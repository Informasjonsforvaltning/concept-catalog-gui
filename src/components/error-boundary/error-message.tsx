import React from 'react';

import './error-message.scss';

interface Props {
  label?: string;
  errorMessage?: string;
  details?: string;
}

export const ErrorMessage = ({ label, errorMessage, details }: Props): JSX.Element => {
  return (
    <div className="error-message">
      <p>
        <strong className="error-message--label">{label}</strong>
      </p>
      <p className="error-message--msg">{errorMessage}</p>
      {details && <details className="error-message--details">{details}</details>}
    </div>
  );
};
