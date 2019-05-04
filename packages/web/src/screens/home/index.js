import React, { Component } from 'react';
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
