import React, { FC, HTMLAttributes } from 'react';

import HeaderBase from '@fellesdatakatalog/internal-header';

interface Props extends HTMLAttributes<HTMLInputElement> {}

import Link from '@fellesdatakatalog/link';
import authService from '../../services/auth-service';
import { getConfig } from '../../config';
import { useLocation } from 'react-router-dom';

const showManageConceptCatalogsUrl = () => {
  const resourceRoles = authService.getResourceRoles();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const currentCatalogId = pathParts ? pathParts[1] : undefined;

  return resourceRoles.some((role) => {
    const roleOrgNumber = role?.resourceId;
    return authService.hasOrganizationAdminPermission(
      currentCatalogId ? currentCatalogId : roleOrgNumber
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
    <Link href={`${getConfig().searchHost}/guidance`}>Registrere data</Link>
    <Link href={getConfig().adminGui.host}>Høste data</Link>
    <Link href={getConfig().searchHost} external>
      Søk i Felles datakatalog
    </Link>
  </HeaderBase>
);
