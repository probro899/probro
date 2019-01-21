import React, { Component } from 'react';
import { Input } from '../../../common';

const elems = ['red', 'blue', 'yellow', 'green'];
let background = 1;
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { animationName: [], animationIndex: 0 };
  }

  componentWillMount() {
    const styleSheet = document.styleSheets[0]; //eslint-disable-line
    const animations = [];
    let i = 0;
    for (i; i < elems.length - 1; i += 1) {
      const animationName = `slider${Math.round(Math.random() * 100)}`;
      const keyframes = `@keyframes ${animationName} {
        from {background-color: ${elems[i]};}
        to {background-color: ${elems[i + 1]};}
      }`;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      animations.push(animationName);
    }
    if (i === elems.length - 1) {
      const animationName = `slider${Math.round(Math.random() * 100)}`;
      const keyframes = `@keyframes ${animationName} {
        from {background-color: ${elems[i]};}
        to {background-color: ${elems[0]};}
      }`;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      animations.push(animationName);
    }
    this.setState({ animationName: animations });
    setInterval(this.changeBackGround, 5000);
  }

  changeBackGround = () => {
    this.changeBackGroundElem();
    const { animationIndex } = this.state;

    if (animationIndex === elems.length - 1) {
      this.setState({ animationIndex: 0 });
    } else {
      this.setState({ animationIndex: animationIndex + 1 });
    }
  }

  changeBackGroundElem = () => {
    background += 1;
    if (background === elems.length) {
      background = 0;
    }
  }

  render() {
    const { animationName, animationIndex } = this.state;
    const styles = {
      animationName: animationName[animationIndex],
      animationDuration: '3s',
      backgroundColor: elems[background],
    };
    return (
      <div className="slider-container">
        <div className="slider" style={styles} />
        <div className="search-box-container">
          <Input placeholder="Enter a Keyword" iconName="Search" />
        </div>
      </div>
    );
  }
}

export default Slider;
