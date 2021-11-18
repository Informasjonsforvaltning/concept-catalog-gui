import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import Footer from '@fellesdatakatalog/internal-footer';
import Header from '@fellesdatakatalog/internal-header';
import Link from '@fellesdatakatalog/link';

import { routeConfig } from './routeConfig';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs.component';
import { authService } from '../services/auth-service';

import { StateProvider } from './context/stateContext';
import { getConfig } from '../config';

export const App: React.FC = () => (
  <Router>
    <StateProvider>
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
    </StateProvider>
  </Router>
);
