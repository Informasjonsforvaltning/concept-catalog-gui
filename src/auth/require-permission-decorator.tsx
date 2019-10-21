import React, { ComponentType } from 'react';
import { hasPermissionForResource, logout } from './auth-service';

export const requirePermissionDecorator = ({ resource, resourceIdPropName, permission }) => (
  Component: ComponentType
) => props => {
  if (!hasPermissionForResource({ resource, resourceId: props[resourceIdPropName], permission })) {
    // todo right now this will redirect to login url with redirect to self.
    // effectively it means that user gets chance to authenticate as another role, and continue accessing the resource.
    // we want to change it to a click-trough where user is infomed about the upcoming action with some explanation.
    logout();
    return null;
  }
  return <Component {...props} />;
};
