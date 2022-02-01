import { ConceptListPage } from '../pages/concept-list-page/concept-list-page';
import { ConceptRegistrationPage } from '../pages/concept-registration-page/concept-registration-page';
import { OverviewPage } from '../pages/overview-page/overview-page';
import { localization } from '../lib/localization';
import { ConceptBreadcrumb } from '../components/breadcrumbs/concept-breadcrumb/concept-breadcrumb.component';

export const routeConfig = [
  {
    path: '/',
    component: OverviewPage,
    exact: true,
    breadcrumb: localization.breadCrumbsConceptCollections
  },
  {
    path: '/:catalogId',
    component: ConceptListPage,
    exact: true,
    breadcrumb: localization.breadCrumbsConceptCatalog
  },
  {
    path: '/:catalogId/:conceptId',
    component: ConceptRegistrationPage,
    exact: true,
    breadcrumb: ConceptBreadcrumb
  }
];
