/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';

class Index extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <iframe
          src="https://player.vimeo.com/video/490326326"
          width="640"
          height="360"
          frameborder="0"
          allowfullscreen
          allow="autoplay;encrypted-media"
        />
      </div>

    );
  }
}
export default Index;
