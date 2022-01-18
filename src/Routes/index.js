import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Feedback from '../pages/Feedback';
import Game from '../pages/Game';
import Login from '../pages/Login';
import Settings from '../pages/Settings';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default Routes;
