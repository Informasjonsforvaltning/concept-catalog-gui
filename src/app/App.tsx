import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import Footer from '@fellesdatakatalog/internal-footer';
import Header from '@fellesdatakatalog/internal-header';
import Link from '@fellesdatakatalog/link';

import { routeConfig } from './routeConfig';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs.component';
import { authService } from '../services/auth-service';

import '../assets/style/bootstrap-override.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/helper.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/portal.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/typo.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/common.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/animations.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/register.scss';
import 'font-awesome/scss/font-awesome.scss';
import { StateProvider } from './context/stateContext';
import { getConfig } from '../config';

export const App: React.FC = () => (
  <Router>
    <StateProvider>
      <div className="d-flex flex-column site theme-fdk">
        <Header
          homeUrl={getConfig().registrationHost}
          username={authService.getUser()?.name}
          onLogout={authService.logout}
        >
          <Link href={`${getConfig().searchHost}/guidance`}>Registrere data</Link>
          <Link href={getConfig().adminGui.host}>Høste data</Link>
          <Link href={getConfig().searchHost} external>
            Søk i Felles datakatalog
          </Link>
        </Header>
        <Breadcrumbs />
        <div className="site-content d-flex flex-column pt-5">
          <Switch>
            {routeConfig.map((route, i) => (
              <Route key={`${i}-${_.get(route, 'path', '')}`} {...route} />
            ))}
          </Switch>
        </div>
        <Footer />
      </div>
    </StateProvider>
  </Router>
);
