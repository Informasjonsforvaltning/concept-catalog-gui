import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Header } from '../components/app-header/app-header.component';
import { Hello } from '../components/Hello';
import { ConceptListPage } from '../pages/concept-list-page/concept-list-page';

import '../assets/style/bootstrap-override.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/helper.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/portal.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/typo.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/common.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/animations.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/register.scss';
import 'font-awesome/scss/font-awesome.scss';

export const App: FunctionComponent = (): JSX.Element => (
  <Router>
    <div className="d-flex flex-column site">
      <Header />
      <div className="site-content d-flex flex-column pt-5">
        <Link to="/list">Link</Link>
        <Switch>
          <Route path="/" component={Hello} exact={true} />
          <Route path="/list" component={ConceptListPage} exact={true} />
        </Switch>
      </div>
    </div>
  </Router>
);
