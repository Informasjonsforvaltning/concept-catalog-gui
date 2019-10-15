/**
 * An error boundary prevents the entire destruction of the react render
 * process, thus allowing the user to still use functionality that is not
 * directly affected by the error.
 */

import React from 'react';
import { ErrorMessage } from './error-message';

interface ErrorMessageProps {
  hasError?: boolean;
  errorObj?: object;
  errorInfo?: {
    componentStack: string;
  };
}

/* eslint-disable */
export class ErrorBoundary extends React.Component<ErrorMessageProps> {
  state: ErrorMessageProps = {
    hasError: false,
    errorObj: {},
    errorInfo: {
      componentStack: ''
    }
  };

  componentDidCatch(error, info): void {
    // Display fallback UI
    this.setState({
      hasError: true,
      errorObj: error,
      errorInfo: info
    });
  }

  render(): React.ReactNode {
    const { hasError, errorObj, errorInfo } = this.state;
    const { children } = this.props;
    if (!hasError) {
      return children;
    }

    return (
      <ErrorMessage
        label="Something went wrong"
        errorMessage={errorObj && errorObj.toString()}
        details={errorInfo && errorInfo.componentStack}
      />
    );
  }
}
/* eslint-enable */
