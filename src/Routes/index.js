import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login,
  Settings,
  Game,
  Feedback,
  Ranking,
} from '../pages';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default Routes;
