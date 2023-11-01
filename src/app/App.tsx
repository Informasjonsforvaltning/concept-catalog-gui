import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import _ from 'lodash';
import Footer from '@fellesdatakatalog/external-footer';

import { routeConfig } from './routeConfig';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs.component';
import { store } from './redux/store';
import { Header } from '../components/header';

export const App: React.FC = () => {

  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Breadcrumbs />
        <Switch>
          {routeConfig.map((route, i) => (
            <Route key={`${i}-${_.get(route, 'path', '')}`} {...route} />
          ))}
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
};
