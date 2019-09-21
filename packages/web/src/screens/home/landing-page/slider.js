import React, { Component } from 'react';
import SearchElement from '../component/search/SearchElement';

const elems = ['red', 'blue', 'yellow', 'green'];
let background = 1;

class Slider extends Component {
  state = {
    animationName: [],
    animationIndex: 0,
  };

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
  }

  componentDidMount() {
    this.setState({ timer: setInterval(this.changeBackGround, 5000) });
  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer);
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

  searchChange = (id, value) => {
    this.setState({ [id]: value });
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
        <SearchElement />
      </div>
    );
  }
}

export default Slider;
