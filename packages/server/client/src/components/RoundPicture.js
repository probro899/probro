import React from 'react';
import PropTypes from 'prop-types';

class RoundPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = { portrait: false };
    const { imgUrl } = this.props;
    this.checkOrientation(imgUrl);
  }

  checkOrientation = (imgUrl) => {
    if (typeof document === 'object') {
      const img = new Image();
      img.onload = () => {
        if (img.height > img.width) this.setState({ portrait: true });
      };
      img.src = imgUrl;
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { imgUrl } = this.props;
    if (prevProps.imgUrl !== imgUrl) {
      this.checkOrientation(imgUrl);
      return false;
    }
    return true;
  }

  render() {
    const { imgUrl } = this.props;
    const { portrait } = this.state;
    return (
      <img
        className={`round-image ${portrait ? 'portrait' : 'landscape'}`}
        src={imgUrl}
        alt="Round representation"
      />
    );
  }
}

RoundPicture.propTypes = {
  imgUrl: PropTypes.string.isRequired,
};

export default RoundPicture;
