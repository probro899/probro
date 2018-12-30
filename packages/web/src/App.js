import React, { Component } from 'react';
import add from '@probro/common';
import Home from './screens/';

class App extends Component {
  state ={};

  render() {
    return (
<<<<<<< HEAD
      <div className="App">
        this value return from common package
        {
        add(10, 100)
          }
      </div>
=======
      <Home />
>>>>>>> 00e640db61465abfeae941ca21fc7bbb3cb18563
    );
  }
}

export default App;
