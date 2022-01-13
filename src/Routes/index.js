import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Settings from '../pages/Settings';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default Routes;
