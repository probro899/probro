import React, { Component } from 'react';
import axios from 'axios';
import { Login, Registration } from './auth';
import { Navbar, Slider } from './component';


class HomePage extends Component {
  state = {};

  componentWillMount() {
    const response = axios.get('http://localhost:3000/user');
    console.log(response);
  }

  render() {
    return (
      <div>
        <Navbar />
        <Slider />
      </div>
    );
  }
}

export default HomePage;
export { Login, Registration, Navbar };
