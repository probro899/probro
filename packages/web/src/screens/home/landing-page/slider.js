import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import SearchElement from '../component/search/SearchElement';
import { ENDPOINT } from '../../../config';


class Slider extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    const { data } = this.props;
    const elems = [];
    data.map((img) => {
      elems.push(`${ENDPOINT}/images/slider/${img}`);
    });
    this.setState({
      data: elems,
    });
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      const elems = [];
      data.map((img) => {
        elems.push(`${ENDPOINT}/images/slider/${img}`);
      });
      this.setState({
        data,
      });
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
          transitionTime={500}
          showStatus={false}
          infiniteLoop
          autoPlay
        >
          {
            data.map((obj, index) => {
              return (
                <div key={index}>
                  <img src={obj} alt="slide prospectus" />
                </div>
              );
            })
          }
        </Carousel>
        <SearchElement />
      </div>
    );
  }
}

export default Slider;
