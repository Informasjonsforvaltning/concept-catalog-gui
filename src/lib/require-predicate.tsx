import React, { ComponentType } from 'react';

export const requirePredicate =
  (predicate: (props: any) => boolean, elseHandler: () => void) =>
  (Component: ComponentType) =>
  props => {
    if (!predicate(props)) {
      elseHandler();
      return null;
    }
    return <Component {...props} />;
  };
