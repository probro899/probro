import React, { Component } from 'react';
import add from '@probro/common';

class App extends Component {
  render() {
    return (
      <div className="App">
        this value return from common package {add(10 , 100)}
      </div>
    );
  }
}

export default App;
