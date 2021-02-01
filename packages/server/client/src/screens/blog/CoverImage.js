/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import { FiUpload } from 'react-icons/fi';

// const defaultBlogImg = require('../../assets/blog-img.jpg');

class CoverImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fileInputRef = React.createRef();
  }

  onChange = (e) => {
    const { coverChange } = this.props;
    coverChange(e.target.files[0]);
  };

  onClick = () => {
    this.fileInputRef.current.click();
  };

  render() {
    const { coverImage } = this.props;
    return (
      <div className="img-upload-container">
        <div className="blog-cover-img">
          <img alt="default blog icon" src={coverImage || '/assets/graphics/blog-img.jpg'} />
        </div>
        <div
          className="img-upload"
          onClick={this.onClick}
          role="button"
        >
          <div className="pc-img-upload">
            <FiUpload size={20} color="#fff" />
            <span style={{ marginLeft: 10, display: 'inline-grid', fontSize: 16, color: '#fff', alignItems: 'center' }}>Add Cover Image</span>
            <input
              ref={this.fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CoverImage;
