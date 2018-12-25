import React, { Component } from 'react';
import {Input,Button} from '../../../common';

class Slider extends Component {
    render() {
        return(
            <div>
                <div className="slider">
                    <div className="search-box-container">
                        <Input placeholder="Enter a Keyword" iconName="Search"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Slider;