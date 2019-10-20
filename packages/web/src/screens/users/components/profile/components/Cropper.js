import React from 'react';
import { ENDPOINT } from '../../../../../config';

const Croppie = require('croppie');

class Cropper extends React.Component {
  state = {};

  componentDidMount() {
    const { userDetail, account } = this.props;
    const el = document.getElementById('pc-cropper');
    const vanilla = new Croppie(el, {
      viewport: { width: '100%', height: '20%' },
      boundary: { width: '100%', height: '20%' },
      showZoomer: false,
      enableResize: true,
      enforceBoundary: true,
    });
    vanilla.bind({
      url: `${ENDPOINT}/user/${10000000 + parseInt(account.user.id, 10)}/profile/${userDetail.coverImage}`,
    });
    vanilla.result('blob').then((blob) => {
      console.log('blob', blob);
    });
  }

  render() {
    const { clickEditCover } = this.props;
    return (
      <div
        className="cover-pic"
        style={{
          boxShadow: '-3px 3px 3px',
        }}
        id="pc-cropper"
      >
        <div className="edit-cover">
          <div role="menu" tabIndex="0" onKeyDown={() => false} onClick={() => clickEditCover('reposition')}>
            <span style={{ padding: '3px', border: '1px solid white' }}>Save </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Cropper;
