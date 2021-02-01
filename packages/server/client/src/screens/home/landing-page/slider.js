import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import SearchElement from '../component/search/SearchElement';
import { ENDPOINT } from '../../../config';

class Slider extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    const data = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
    this.setState({ data: data.map(obj => `${ENDPOINT}/assets/images/slider/${obj}`) });
  }

  searchChange = (id, value) => {
    this.setState({ [id]: value });
  }

  render() {
    const { data } = this.state;
    return !data ? <div /> : (
      <div className="slider-container">
        <div className="overlay"></div>
        <Carousel
          interval={5000}
          showIndicators={false}
          showThumbs={false}
          stopOnHover={false}
          dynamicHeight
          showStatus={false}
          infiniteLoop
          autoPlay
        >
          {
            data.map((obj, index) => {
              return (
                <LazyLoadComponent>
                  <div key={index} style={{ backgroundImage: `url(${obj})` }} className="slider-img-con" />
                </LazyLoadComponent>
              );
            })
          }
        </Carousel>
        <SearchElement />
      </div>
    );
  }
}

Slider.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Slider;
