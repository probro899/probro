import React from 'react';
import { Switch } from '@blueprintjs/core';

class AdvancedSettings extends React.Component {
  state={};

  render() {
    return (
      <div className="container-settings">
        <div className="switch-adv-con">
          <p>
            Change your profile to mentor
            <br />
            and help people learn with your knowledge base.
            <br />
            Be a part to educate the world.
          </p>
          <Switch
            className="switch-button"
            checked={false}
            large
            innerLabel="Mentor"
          />
        </div>
      </div>
    );
  }
}

export default AdvancedSettings;
