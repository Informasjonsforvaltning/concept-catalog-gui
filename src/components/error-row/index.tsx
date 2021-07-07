import React, { FC, useState } from 'react';
import { Exception } from '../../domain/Common';
import SC from './styled';

interface Props {
  errorTitle: string;
  errorMessage: Exception;
}

const ErrorRow: FC<Props> = ({ errorTitle, errorMessage: { message, name } }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <SC.ErrorContainer className="row mb-4">
      <span>
        <SC.ErrorIcon />
        {errorTitle}
        {(name != null || message != null) && (
          <SC.ExpandButton onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <>
                <SC.CollapseIcon /> Skjul detaljer
              </>
            ) : (
              <>
                <SC.ExpandIcon /> Vis detaljer
              </>
            )}
          </SC.ExpandButton>
        )}
      </span>
      {expanded && (
        <SC.ExceptionContainer>
          {name && <SC.ExceptionName>{name}</SC.ExceptionName>}
          {message && <SC.ExceptionMessage>{message}</SC.ExceptionMessage>}
        </SC.ExceptionContainer>
      )}
    </SC.ErrorContainer>
  );
};

export default ErrorRow;
