import React, { Component } from 'react';
import { Login,Registration } from './auth';
import { Navbar,Slider } from './component';

class HomePage extends Component {
    render(){
        return(
            <div>
                <Navbar />
                <Slider />
            </div>
        );
    }
}

export default HomePage;
export {Login, Registration, Navbar};