import React, { Component } from 'react';
import axios from 'axios';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = { image: {} };
  }

  componentWillMount() {
    this.getImages();
  }

  getImages = async () => {
    const res = await axios.get('http://localhost:3000/image');
    this.setState({ image: res.data });
  }

  render() {
    const { image } = this.state;

    return (
      <div className="banner-container">
        <div className="banner-image">
          <img src={image.image_url} alt="banner here" />
          <p>Bro</p>
        </div>
        <div className="banner-image">
          <img src={image.image_url} alt="banner here" />
          <p>Pro</p>
        </div>
        <div className="banner-image">
          <img src={image.image_url} alt="banner here" />
          <p>Legend</p>
        </div>
      </div>
    );
  }
}

export default Banner;
