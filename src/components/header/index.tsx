import React, { FC, HTMLAttributes } from 'react';

import HeaderBase from '@fellesdatakatalog/internal-header';

import Link from '@fellesdatakatalog/link';
import { useLocation } from 'react-router-dom';
import authService from '../../services/auth-service';
import { getConfig } from '../../config';

interface Props extends HTMLAttributes<HTMLInputElement> {}

const showManageConceptCatalogsUrl = () => {
  const resourceRoles = authService.getResourceRoles();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const currentCatalogId = pathParts ? pathParts[1] : undefined;

  return resourceRoles.some(role => {
    const roleOrgNumber = role?.resourceId;
    return authService.hasOrganizationAdminPermission(
      currentCatalogId || roleOrgNumber
    );
  });
};

export const Header: FC<Props> = () => (
  <HeaderBase
    homeUrl={getConfig().registrationHost}
    username={authService.getUser()?.name}
    onLogout={authService.logout}
    useDemoLogo={getConfig().useDemoLogo}
    showManageConceptCatalogsUrl={showManageConceptCatalogsUrl()}
    manageConceptCatalogsUrl={getConfig().catalogAdminBaseUri}
  >
    <Link href={`${getConfig().fdkBaseUri}/guidance`}>Registrere data</Link>
    <Link href={getConfig().adminGui.host}>Høste data</Link>
    <Link href={getConfig().fdkBaseUri} external>
      Søk i Felles datakatalog
    </Link>
  </HeaderBase>
);
