import { ConceptListPage } from '../pages/concept-list-page/concept-list-page';

export const routeConfig = [
  {
    path: '/:catalogId',
    component: ConceptListPage,
    exact: true
  },
  {
    path: '/list',
    component: ConceptListPage,
    exact: true
  }
];
