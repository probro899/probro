import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import SearchElement from '../component/search/SearchElement';
import { ENDPOINT } from '../../../config';

class Slider extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    const { data } = this.props;
    this.setState({ data: data.map(obj => `${ENDPOINT}/images/slider/${obj}`) });
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    if (data !== nextProps.data) {
      this.setState({ data: nextProps.data.map(obj => `${ENDPOINT}/images/slider/${obj}`) });
    }
  }

  searchChange = (id, value) => {
    this.setState({ [id]: value });
  }

  render() {
    const { data } = this.state;
    return !data ? <div /> : (
      <div className="slider-container">
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
                <div key={index} style={{ backgroundImage: `url(${obj})` }} className="slider-img-con" />
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
