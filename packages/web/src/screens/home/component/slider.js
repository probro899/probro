import React, { Component } from 'react';
import {Input} from '../../../common';

let color = ['red', 'blue', 'yellow', 'green'];
let currentColorIndex = 0;

class Slider extends Component {

    state={ color: 'red' };

    componentDidMount() {
    setInterval(this.changeBackGroundColor, 2000);
    }

    changeBackGroundColor = () => {
        if (currentColorIndex === 4) {
            currentColorIndex = 0;
            this.setState({ color: color[currentColorIndex]});
            currentColorIndex +=1;
        } else {
            this.setState({ color: color[currentColorIndex] });
            currentColorIndex += 1;
        }
    }

    render() {
        return (
            <div className="slider-container">
                <div className="slider" style={{ backgroundColor: this.state.color }}></div>
                <div className="search-box-container">
                    <Input placeholder="Enter a Keyword" iconName="Search"/>
                </div>
            </div>
        );
    }
}

export default Slider;