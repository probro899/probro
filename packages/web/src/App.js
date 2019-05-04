import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Home from './screens';

class App extends Component {
  state ={};

  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

export default App;
