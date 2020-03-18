import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

export default ({ url }) => {
  return (
    <div className="social-madia-share" style={{ display: 'flex' }}>
      <FacebookShareButton url={url} style={{ margin: 5 }}>
        <FacebookIcon size={30} />
      </FacebookShareButton>
      <TwitterShareButton url={url} style={{ margin: 5 }}>
        <TwitterIcon size={30} />
      </TwitterShareButton>
      <LinkedinShareButton url={url} style={{ margin: 5 }}>
        <LinkedinIcon size={30} />
      </LinkedinShareButton>
    </div>
  );
};
