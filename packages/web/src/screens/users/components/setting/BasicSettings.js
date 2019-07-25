import React from 'react';
import { Icon } from '@blueprintjs/core';

class BasicSettings extends React.Component {
  state={};

  render() {
    return (
      <div className="container-settings">
        <p>
          <span className="label">Full Name</span>
          <span className="value">Nabin Bhusal</span>
          <Icon icon="edit" color="rgba(167, 182, 194, 1)" className="edit-icon" />
        </p>
        <p>
          <span className="label">Gender</span>
          <span className="value">Male</span>
          <Icon icon="edit" color="rgba(167, 182, 194, 1)" className="edit-icon" />
        </p>
        <p>
          <span className="label">Carrier Interests</span>
          <Icon icon="edit" color="rgba(167, 182, 194, 1)" className="edit-icon" />
          <ul>
            <li>Leadership</li>
            <li>Enterpreneur</li>
            <li>Engineering</li>
          </ul>
        </p>
      </div>
    );
  }
}

export default BasicSettings;
