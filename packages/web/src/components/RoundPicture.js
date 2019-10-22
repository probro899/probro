import React from 'react';

class RoundPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = { portrait: false };
    this.checkOrientation();
  }

  checkOrientation = () => {
    const { imgUrl } = this.props;
    const img = new Image();
    img.onload = () => {
      if (img.height > img.width) {
        this.setState({
          portrait: true,
        });
      }
    };
    img.src = imgUrl;
  }

  render() {
    const { imgUrl } = this.props;
    const { portrait } = this.state;
    return (
      <img
        className={portrait ? 'portrait' : 'landscape'}
        src={imgUrl}
        alt="Round representation"
      />
    );
  }
}

export default RoundPicture;
