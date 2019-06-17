import { ConceptListPage } from '../pages/concept-list-page/concept-list-page';
import { PublisherBreadcrumb } from './breadcrumbs/publisher-breadcrumb/publisher-breadcrumb.component';

export const routeConfig = [
  {
    path: '/:catalogId',
    component: ConceptListPage,
    exact: true,
    breadcrumb: props => PublisherBreadcrumb({ ...props, breadCrumbLabel: 'breadCrumbsPublisherList' })
  },
  {
    path: '/list',
    component: ConceptListPage,
    exact: true,
    breadcrumb: props => PublisherBreadcrumb({ ...props, breadCrumbLabel: 'breadCrumbsPublisherList' })
  }
];
