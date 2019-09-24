import React, { Component } from 'react';
import SearchElement from '../component/search/SearchElement';
import { ENDPOINT } from '../../../config';

let elems = [];
let background = 1;

class Slider extends Component {
  state = {
    animationName: [],
    animationIndex: 0,
  };

  componentDidMount() {
    const { data } = this.props;
    data.map((img) => {
      elems.push(`${ENDPOINT}/images/slider/${img}`);
    });
    console.log(elems);
    const styleSheet = document.styleSheets[0]; //eslint-disable-line
    const animations = [];
    let i = 0;
    for (i; i < elems.length - 1; i += 1) {
      const animationName = `slider${Math.round(Math.random() * 100)}`;
      const keyframes = `@keyframes ${animationName} {
        from {backgroundImage: url(${elems[i]});}
        to {backgroundImage: url(${elems[i + 1]});}
      }`;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      animations.push(animationName);
    }
    if (i === elems.length - 1) {
      const animationName = `slider${Math.round(Math.random() * 100)}`;
      const keyframes = `@keyframes ${animationName} {
        from {backgroundImage: url(${elems[i]});}
        to {backgroundImage: url(${elems[0]});}
      }`;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      animations.push(animationName);
    }
    this.setState({
      animationName: animations,
      timer: setInterval(this.changeBackGround, 5000),
    });
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      data.map((img) => {
        elems.push(`${ENDPOINT}/images/slider/${img}`);
      });
    }
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
      animationDuration: '2s',
      backgroundImage: `url(${elems[background]})`,
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
