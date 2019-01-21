import React, { Component } from 'react';
// import axios from 'axios';
import { Login, Registration } from './auth';
import { Navbar, Slider, Post, Banner, Popular } from './component';


class HomePage extends Component {
  state = {};

  render() {
    return (
      <div>
        <Navbar />
        <Slider />
        <Banner />
        <Post />
        <Popular />
      </div>
    );
  }
}

export default HomePage;
export { Login, Registration, Navbar };
