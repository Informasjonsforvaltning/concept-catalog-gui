import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Hello } from '../components/Hello';

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
      <div className="site-content d-flex flex-column pt-5">
        <Link to="/list">Link</Link>
        <Switch>
          <Route path="/" component={Hello} exact={true} />
          <Route path="/list" component={Hello} exact={true} />
        </Switch>
      </div>
    </div>
  </Router>
);
