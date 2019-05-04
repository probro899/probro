import React, { Component } from 'react';
import add from '@probro/common';
import SocketClient from './socket';

class App extends Component {
  state ={};

  componentDidMount() {
    SocketClient('ws:localhost:4001');
  }

  render() {
    return (
      <div className="App">
        this value return from common package
        {
        add(10, 100)
          }
      </div>
    );
  }
}

export default App;
