import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Trivia from '../pages/Trivia';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/trivia" component={ Trivia } />
      </Switch>
    );
  }
}

export default Routes;
