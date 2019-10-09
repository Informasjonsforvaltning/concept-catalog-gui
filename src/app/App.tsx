import React, { FunctionComponent, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';
import { Header } from '../components/app-header/app-header.component';
import { Footer } from '../components/app-footer/app-footer.component';

import { routeConfig } from './routeConfig';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs.component';

import '../assets/style/bootstrap-override.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/helper.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/portal.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/typo.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/common.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/animations.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/register.scss';
import 'font-awesome/scss/font-awesome.scss';
import { statusBarReducer } from './reducers/statusBarReducer';
import { StatusBarProvider } from './context/statusBarContext';

export const App: FunctionComponent = (): JSX.Element => {
  const [statusBarState, dispatch] = useReducer(statusBarReducer, [{}]);
  const value = { statusBarState, dispatch };
  return (
    <Router>
      <StatusBarProvider value={value}>
        <div className="d-flex flex-column site theme-fdk">
          <Header />
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
      </StatusBarProvider>
    </Router>
  );
};
