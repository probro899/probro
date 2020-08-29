import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import store from './store';
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
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

export default App;
