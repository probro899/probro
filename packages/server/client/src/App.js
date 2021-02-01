import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import Home from './screens';

class App extends Component {
  state ={};

  componentDidMount() {
    // initialize google analytics
    ReactGA.initialize('UA-165382110-1');
    ReactGA.pageview('/');
  }

  render() {
    return (
      <Switch>
        <Route exact to="/" component={Home} />
      </Switch>
    );
  }
}
export default App;
