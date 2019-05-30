import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Hello } from '../components/Hello';

export const App = () => (
  <Router>
    <Link to="/list">Link</Link>
    <Switch>
      <Route path="/" component={Hello} exact={true} />
      <Route path="/list" component={Hello} exact={true} />
    </Switch>
  </Router>
);
