import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import Footer from '@fellesdatakatalog/external-footer';
import Header from '@fellesdatakatalog/internal-header';
import Link from '@fellesdatakatalog/link';

import { routeConfig } from './routeConfig';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs.component';
import { authService } from '../services/auth-service';

import { getConfig } from '../config';
import { store } from './redux/store';

export const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Header
        homeUrl={getConfig().registrationHost}
        username={authService.getUser()?.name}
        onLogout={authService.logout}
        useDemoLogo={getConfig().useDemoLogo}
      >
        <Link href={`${getConfig().searchHost}/guidance`}>Registrere data</Link>
        <Link href={getConfig().adminGui.host}>Høste data</Link>
        <Link href={getConfig().searchHost} external>
          Søk i Felles datakatalog
        </Link>
      </Header>
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
